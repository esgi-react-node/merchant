const sequelize = require("../lib/sequelize");
const User = require("../models/sequelize/User");

sequelize
  .sync({ force: true})
  .then(
    async () => {
        await User.create({
            username:"admin@admin.com",
            password:"abcABC123!@#",
            firstname:"User",
            lastname:"Doe",
            role:"admin"
        });
    })
.then((result) => console.log("Fixtures merchant done"))
.catch((error) => console.error("Error during fixture", error));