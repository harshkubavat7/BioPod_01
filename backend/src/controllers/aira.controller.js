// const Sensor = require("../models/SensorData.model");
// const Feed = require("../models/FeedRecord.model");

// exports.chat = async (req, res) => {
//   try {
//     const { message } = req.body;

//     if (!message) {
//       return res.json({
//         reply: "Please ask something about the BIOPOD system.",
//       });
//     }

//     // Fetch latest data
//     const latestSensor = await Sensor.findOne().sort({ createdAt: -1 });

//     const feedAgg = await Feed.aggregate([
//       {
//         $group: {
//           _id: null,
//           total_input: { $sum: "$input_waste_kg" },
//           total_output: { $sum: "$output_fertilizer_kg" },
//         },
//       },
//     ]);

//     const msg = message.toLowerCase();
//     let reply =
//       "I can help with environment status, health score, fan state, feed efficiency, and safety insights.";

//     // ---------------- ENVIRONMENT ----------------
//     if (msg.includes("status") || msg.includes("environment")) {
//       if (!latestSensor) {
//         reply = "No sensor data available yet.";
//       } else {
//         reply = `Current temperature is ${latestSensor.temperature}°C, humidity is ${latestSensor.humidity}%, and air quality is ${latestSensor.air_quality} ppm.`;
//       }
//     }

//     // ---------------- HEALTH ----------------
//     else if (msg.includes("health")) {
//       if (!latestSensor) {
//         reply = "Health data is not available yet.";
//       } else {
//         reply = `The current health score is ${latestSensor.health_score}%. This score is calculated using temperature, humidity, and air quality conditions.`;
//       }
//     }

//     // ---------------- FAN ----------------
//     else if (msg.includes("fan")) {
//       if (!latestSensor) {
//         reply = "Fan status is currently unavailable.";
//       } else {
//         reply =
//           latestSensor.fan === "ON"
//             ? "The fan is currently ON to regulate the environment."
//             : "The fan is currently OFF as conditions are stable.";
//       }
//     }

//     // ---------------- FEED ----------------
//     else if (msg.includes("feed") || msg.includes("fertilizer")) {
//       if (!feedAgg.length || feedAgg[0].total_input === 0) {
//         reply = "Feed data is not available yet.";
//       } else {
//         const f = feedAgg[0];
//         const efficiency = (
//           (f.total_output / f.total_input) *
//           100
//         ).toFixed(2);

//         reply = `So far, ${f.total_input} kg of waste has produced ${f.total_output} kg of fertilizer. Conversion efficiency is ${efficiency}%.`;
//       }
//     }

//     // ---------------- SAFETY ----------------
//     else if (msg.includes("safe")) {
//       if (!latestSensor) {
//         reply = "Safety status cannot be determined yet.";
//       } else {
//         reply =
//           latestSensor.health_score >= 60
//             ? "Yes, the system is currently operating in a safe range."
//             : "Conditions are suboptimal. Monitoring and ventilation are advised.";
//       }
//     }

//     res.json({ reply });
//   } catch (err) {
//     console.error("AIRA ERROR:", err.message);
//     res.status(500).json({
//       reply: "AI service encountered an internal error.",
//     });
//   }
// };


const Sensor = require("../models/SensorData.model");
const BSFBatch = require("../models/BSFBatch");
const Feed = require("../models/FeedRecord.model");
const { calculateBSFHealth } = require("../utils/bsfHealthEngine");

/* ================= CHATBOT ================= */

exports.chatWithAira = async (req, res) => {
  try {
    const userMessage = (req.body.message || "").toLowerCase();

    // 1️⃣ Collect LIVE CONTEXT
    const sensor = await Sensor.findOne().sort({ createdAt: -1 });
    const batch = await BSFBatch.findOne({ device_id: "BSF_001" });

    if (!sensor || !batch) {
      return res.json({
        reply: "⚠️ I don’t have enough data yet. Please wait for sensors to stabilize.",
      });
    }

    const ageDays = Math.floor(
      (Date.now() - batch.started_on) / (1000 * 60 * 60 * 24)
    );

    const feedAgg = await Feed.aggregate([
      { $match: { type: "input" } },
      { $group: { _id: null, total: { $sum: "$quantity" } } },
    ]);

    const feedKg = feedAgg[0]?.total || 0;

    // 2️⃣ Compute HEALTH + INSIGHTS
    const health = calculateBSFHealth({
      sensor,
      feedKg,
      ageDays,
    });

    // 3️⃣ LEVEL 1: CONTEXT-AWARE
    if (userMessage.includes("status") || userMessage.includes("health")) {
      return res.json({
        reply: `Current BSF stage is ${health.stage}. Health score is ${health.health_score}%.`,
      });
    }

    // 4️⃣ LEVEL 2: CAUSE → EFFECT → ACTION
    if (userMessage.includes("why") || userMessage.includes("problem")) {
      if (health.insights.length === 0) {
        return res.json({
          reply: "Everything looks stable right now. No critical stress detected.",
        });
      }

      return res.json({
        reply:
          `I detected the following issues:\n` +
          health.insights.map(i => `• ${i}`).join("\n") +
          `\n\nRecommended action: Adjust conditions to bring parameters back to optimal range.`,
      });
    }

    // 5️⃣ LEVEL 3: STAGE-AWARE GUIDANCE
    if (userMessage.includes("what should i do")) {
      if (health.stage === "Egg") {
        return res.json({
          reply:
            "Egg stage detected. Maintain stable humidity (45–70%) and avoid disturbing the substrate.",
        });
      }

      if (health.stage === "Larva") {
        return res.json({
          reply:
            "Larval stage active. Ensure sufficient moist feed, good airflow, and stable temperature.",
        });
      }

      if (health.stage === "Pupa") {
        return res.json({
          reply:
            "Pupa stage detected. Avoid adding feed or moisture. Keep environment stable.",
        });
      }
    }

    // 6️⃣ LEVEL 4: PROACTIVE WARNING
    if (health.predicted_delay_days > 0) {
      return res.json({
        reply:
          `⚠️ Warning: Current stress conditions may delay harvest by ~${health.predicted_delay_days} days.\n` +
          `Main causes:\n` +
          health.insights.map(i => `• ${i}`).join("\n"),
      });
    }

    // 7️⃣ DEFAULT RESPONSE
    res.json({
      reply:
        "I am monitoring BSF growth continuously. Ask me about health, stage, or recommended actions.",
    });
  } catch (err) {
    console.error("AIRA ERROR:", err);
    res.status(500).json({
      reply: "❌ I encountered an internal error while analyzing the system.",
    });
  }
};
