const SecurityRouter = require("./security");
const UserRouter = require("./users");
const verifyToken = require("../middlewares/verifyToken");

const routerManager = (app) => {
  app.use("/", SecurityRouter);
  app.use(verifyToken);
  app.use("/users", UserRouter);
};

module.exports = routerManager;
