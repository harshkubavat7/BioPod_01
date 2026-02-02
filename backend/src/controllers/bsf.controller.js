// const BSFBatch = require("../models/BSFBatch");

// /**
//  * GET /api/ai/bsf-status
//  */

// const { detectStage } = require("../utils/bsfHealthEngine");

// exports.getBSFStatus = async (req, res) => {
//   try {
//     const deviceId = req.query.device_id || "BSF_001";

//     const batch = await BSFBatch.findOne({ device_id: deviceId });
//     if (!batch) {
//       return res.status(404).json({ error: "BSF batch not found" });
//     }

//     const ageDays = Math.floor(
//       (Date.now() - batch.started_on) / (1000 * 60 * 60 * 24)
//     );

//     const stage = detectStage(ageDays);

//     res.json({
//       device_id: deviceId,
//       started_on: batch.started_on,
//       age_days: ageDays,
//       stage,
//     });
//   } catch (err) {
//     res.status(500).json({ error: "BSF status failed" });
//   }
// };


// /**
//  * POST /api/ai/bsf-reset
//  */
// exports.resetBSFCycle = async (req, res) => {
//   try {
//     const { device_id = "BSF_001", started_on } = req.body;

//     const startDate = started_on
//       ? new Date(started_on)
//       : new Date();

//     if (isNaN(startDate.getTime())) {
//       return res.status(400).json({
//         error: "Invalid start date",
//       });
//     }

//     await BSFBatch.findOneAndUpdate(
//       { device_id },
//       { started_on: startDate },
//       { upsert: true, new: true }
//     );

//     return res.json({
//       success: true,
//       started_on: startDate,
//     });
//   } catch (err) {
//     console.error("❌ BSF RESET ERROR:", err);
//     return res.status(500).json({
//       error: "Failed to reset BSF cycle",
//       details: err.message,
//     });
//   }
// };


const BSFBatch = require("../models/BSFBatch");
const { detectStage } = require("../utils/bsfHealthEngine");

/**
 * GET /api/ai/bsf-status
 * Safe, non-crashing status API
 */
exports.getBSFStatus = async (req, res) => {
  try {
    const deviceId = req.query.device_id || "BSF_001";

    const batch = await BSFBatch.findOne({ device_id: deviceId });

    if (!batch || !batch.started_on) {
      return res.status(200).json({
        device_id: deviceId,
        status: "not_initialized",
        message: "BSF cycle not started yet",
        age_days: 0,
        stage: "Unknown",
      });
    }

    const startedOn = new Date(batch.started_on);

    if (isNaN(startedOn.getTime())) {
      return res.status(200).json({
        device_id: deviceId,
        status: "invalid_start_date",
        message: "Invalid BSF start date",
        age_days: 0,
        stage: "Unknown",
      });
    }

    const ageDays = Math.max(
      0,
      Math.floor((Date.now() - startedOn.getTime()) / (1000 * 60 * 60 * 24))
    );

    let stage = "Unknown";
    try {
      stage = detectStage(ageDays);
    } catch (e) {
      console.warn("⚠️ detectStage failed:", e.message);
    }

    res.json({
      device_id: deviceId,
      started_on: startedOn,
      age_days: ageDays,
      stage,
      status: "active",
    });
  } catch (err) {
    console.error("❌ BSF STATUS ERROR:", err);
    res.status(500).json({
      error: "BSF status failed",
      details: err.message,
    });
  }
};

/**
 * POST /api/ai/bsf-reset
 * Safe reset with validation
 */
exports.resetBSFCycle = async (req, res) => {
  try {
    const { device_id = "BSF_001", started_on } = req.body;

    let startDate;

    if (started_on) {
      startDate = new Date(started_on);
      if (isNaN(startDate.getTime())) {
        return res.status(400).json({
          error: "Invalid start date format",
        });
      }
    } else {
      startDate = new Date();
    }

    const batch = await BSFBatch.findOneAndUpdate(
      { device_id },
      { started_on: startDate },
      { upsert: true, new: true }
    );

    return res.json({
      success: true,
      device_id,
      started_on: batch.started_on,
      message: "BSF cycle reset successfully",
    });
  } catch (err) {
    console.error("❌ BSF RESET ERROR:", err);
    return res.status(500).json({
      error: "Failed to reset BSF cycle",
      details: err.message,
    });
  }
};
