const SecurityRouter = require("./security");
const UserRouter = require("./users");
const OrderRouter = require('./orders');
const CredentialsRouter = require('./credentials');
const verifyToken = require("../middlewares/verifyToken");

const routerManager = (app) => {
  app.use("/", SecurityRouter);
  app.use(verifyToken);
  app.use("/credentials", CredentialsRouter)
  app.use("/users", UserRouter);
  app.use("/orders", OrderRouter);
};

module.exports = routerManager;
