


// const Sensor = require("../models/SensorData.model");

// exports.getLatestStatus = async (req, res) => {
//   try {
//     const latest = await Sensor.findOne({ device_id: "BSF_001" })
//       .sort({ createdAt: -1 })
//       .lean();

//     if (!latest) {
//       return res.status(404).json({
//         error: "No Biopod-1 data available",
//       });
//     }

//     res.json({
//       device_id: latest.device_id,
//       temperature: latest.temperature,
//       humidity: latest.humidity,
//       air_quality: latest.air_quality,
//       fan: latest.fan,
//       mode: latest.mode,
//       sensor_fault: latest.sensor_fault,
//       timestamp: latest.createdAt,
//     });
//   } catch (err) {
//     console.error("❌ STATUS ERROR:", err);
//     res.status(500).json({
//       error: "Failed to fetch status",
//     });
//   }
// };


const Sensor = require("../models/SensorData.model");
const BSFBatch = require("../models/BSFBatch");

exports.getLatestStatus = async (req, res) => {
  try {
    const latest = await Sensor.findOne({ device_id: "BSF_001" })
      .sort({ createdAt: -1 })
      .lean();

    if (!latest) {
      return res.status(404).json({
        error: "No Biopod-1 data available",
      });
    }

    // 🔹 Fetch BSF batch lifecycle info
    const batch = await BSFBatch.findOne({ device_id: "BSF_001" });

    let age_days = null;
    if (batch?.started_on) {
      age_days = Math.floor(
        (Date.now() - new Date(batch.started_on)) / (1000 * 60 * 60 * 24)
      );
    }

    res.json({
      device_id: latest.device_id,
      temperature: latest.temperature,
      humidity: latest.humidity,
      air_quality: latest.air_quality,
      fan: latest.fan,
      mode: latest.mode,
      sensor_fault: latest.sensor_fault,
      age_days, // ✅ THIS UNLOCKS AI STAGE PREDICTION
      timestamp: latest.createdAt,
    });
  } catch (err) {
    console.error("❌ STATUS ERROR:", err);
    res.status(500).json({
      error: "Failed to fetch status",
    });
  }
};
