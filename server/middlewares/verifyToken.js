const JWTVerifyToken = require("../lib/auth").verifyToken;
const { User } = require("../models/sequelize");

const excludedRoutes = [
  '/favicon.ico',
  new RegExp('\/orders\/confirm\/[0-9]{1,}'),
];

const verifyToken = (req, res, next) => {
  if(excludedRoutes.some(link => req.path.match(link))) { return next(); }
  let authHeader = req.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    res.sendStatus(401);
    return;
  }
  authHeader = authHeader.replace("Bearer ", "");

  JWTVerifyToken(authHeader)
    .then(async (payload) => {
      const user = await User.findOne({where: {username: payload.username}});
      req.user = user;
      next();
    })
    .catch((err) => {
      console.error(err);
      return res.sendStatus(401)
    });
};

module.exports = verifyToken;
