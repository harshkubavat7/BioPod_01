const express = require("express");
const router = express.Router();
const { getLatestStatus } = require("../controllers/status.controller");

// GET /api/status/latest
router.get("/latest", getLatestStatus);

module.exports = router;
