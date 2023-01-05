const express = require("express");
const router = express.Router();

const { longinUser, singupUser } = require("../controllers/userController");

router.post("/login", longinUser);

router.post("/signup", singupUser);

module.exports = router;
