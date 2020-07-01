const express = require("express");
const { User } = require("./models/sequelize");
const RouterManager = require("./routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded());
RouterManager(app);

app.listen(3000, () => console.log("listening..."));
