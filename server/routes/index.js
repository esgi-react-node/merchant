const SecurityRouter = require("./security");
const UserRouter = require("./users");
const ArticleRouter = require('./articles');
const verifyToken = require("../middlewares/verifyToken");

const routerManager = (app) => {
  app.use("/", SecurityRouter);
  app.use(verifyToken);
  app.use("/users", UserRouter);
  app.use('/articles', ArticleRouter);
};

module.exports = routerManager;
