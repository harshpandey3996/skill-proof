const express = require("express");
const router = express.Router();

const {
  create,
  Findall,
  loginUser,
} = require("../Controller/hpcontroller");



// user
router.post("/post", create);
router.post("/login", loginUser);
router.get("/get", Findall);



module.exports = router;
