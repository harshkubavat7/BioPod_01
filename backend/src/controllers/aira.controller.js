const Sensor = require("../models/SensorData.model");
const Feed = require("../models/FeedRecord.model");

exports.chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.json({
        reply: "Please ask something about the BIOPOD system.",
      });
    }

    // Fetch latest data
    const latestSensor = await Sensor.findOne().sort({ createdAt: -1 });

    const feedAgg = await Feed.aggregate([
      {
        $group: {
          _id: null,
          total_input: { $sum: "$input_waste_kg" },
          total_output: { $sum: "$output_fertilizer_kg" },
        },
      },
    ]);

    const msg = message.toLowerCase();
    let reply =
      "I can help with environment status, health score, fan state, feed efficiency, and safety insights.";

    // ---------------- ENVIRONMENT ----------------
    if (msg.includes("status") || msg.includes("environment")) {
      if (!latestSensor) {
        reply = "No sensor data available yet.";
      } else {
        reply = `Current temperature is ${latestSensor.temperature}°C, humidity is ${latestSensor.humidity}%, and air quality is ${latestSensor.air_quality} ppm.`;
      }
    }

    // ---------------- HEALTH ----------------
    else if (msg.includes("health")) {
      if (!latestSensor) {
        reply = "Health data is not available yet.";
      } else {
        reply = `The current health score is ${latestSensor.health_score}%. This score is calculated using temperature, humidity, and air quality conditions.`;
      }
    }

    // ---------------- FAN ----------------
    else if (msg.includes("fan")) {
      if (!latestSensor) {
        reply = "Fan status is currently unavailable.";
      } else {
        reply =
          latestSensor.fan === "ON"
            ? "The fan is currently ON to regulate the environment."
            : "The fan is currently OFF as conditions are stable.";
      }
    }

    // ---------------- FEED ----------------
    else if (msg.includes("feed") || msg.includes("fertilizer")) {
      if (!feedAgg.length || feedAgg[0].total_input === 0) {
        reply = "Feed data is not available yet.";
      } else {
        const f = feedAgg[0];
        const efficiency = (
          (f.total_output / f.total_input) *
          100
        ).toFixed(2);

        reply = `So far, ${f.total_input} kg of waste has produced ${f.total_output} kg of fertilizer. Conversion efficiency is ${efficiency}%.`;
      }
    }

    // ---------------- SAFETY ----------------
    else if (msg.includes("safe")) {
      if (!latestSensor) {
        reply = "Safety status cannot be determined yet.";
      } else {
        reply =
          latestSensor.health_score >= 60
            ? "Yes, the system is currently operating in a safe range."
            : "Conditions are suboptimal. Monitoring and ventilation are advised.";
      }
    }

    res.json({ reply });
  } catch (err) {
    console.error("AIRA ERROR:", err.message);
    res.status(500).json({
      reply: "AI service encountered an internal error.",
    });
  }
};
