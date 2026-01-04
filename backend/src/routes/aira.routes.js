const express = require("express");
const router = express.Router();
const airaController = require("../controllers/aira.controller");

router.post("/chat", airaController.chat);

module.exports = router;
