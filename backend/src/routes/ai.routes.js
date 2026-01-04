const express = require("express");
const router = express.Router();

const {
  getHealthHistory,
  getLatestHealth,
  getBSFStatus,
} = require("../controllers/ai.controller");

router.get("/health-history", getHealthHistory);
router.get("/health-latest", getLatestHealth);
router.get("/bsf-status", getBSFStatus);

module.exports = router;
