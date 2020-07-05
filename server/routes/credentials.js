const express = require("express");
const { Credential } = require("../models/sequelize");
const router = express.Router();


router.put("/", async (req, res) => {
  if (!req.user || !req.user.isAdmin()){
    return res.sendStatus(403);
  }
  const {token, secret} = req.body;

  let tokenDb = await Credential.findOne({where: {key: 'token'}});
  if(!tokenDb) { tokenDb = await Credential.create({key: 'token', value: token}) }
  else {
    tokenDb.value = token;
    await tokenDb.save();
  }

  let secretDb = await Credential.findOne({where: {key: 'secret'}});
  if(!secretDb) { await Credential.create({key: 'secret', value: secret}) }
  else {
    secretDb.value = secret;
    await secretDb.save();
  }

  return res.sendStatus(200);
});

module.exports = router;
