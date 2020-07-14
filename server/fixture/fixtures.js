const sequelize = require("../lib/sequelize");
const User = require("../models/sequelize/User");
const Order = require("../models/sequelize/Order");
const Address = require("../models/sequelize/Address");

sequelize
  .sync({ force: true})
  .then(
    async () => {
        let user = await User.create({
            username:"admin@admin.com",
            password:"abcABC123!@#",
            firstname:"User",
            lastname:"Doe",
            role:"admin"
        });
    })
.then((result) => console.log("Fixtures merchant done"))
.catch((error) => console.error("Error during fixture", error));