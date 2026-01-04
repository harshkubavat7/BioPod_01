const Sensor = require("../models/SensorData.model");

/* ================= HEALTH HISTORY ================= */
exports.getHealthHistory = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 50;

    const data = await Sensor.find({ health_score: { $ne: null } })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("health_score createdAt");

    res.json(
      data.reverse().map(d => ({
        time: d.createdAt,
        health_score: d.health_score,
      }))
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch health history" });
  }
};

/* ================= LATEST HEALTH ================= */
exports.getLatestHealth = async (req, res) => {
  try {
    const latest = await Sensor.findOne()
      .sort({ createdAt: -1 })
      .select("health_score");

    res.json({ health_score: latest?.health_score ?? null });
  } catch {
    res.status(500).json({ error: "Failed to fetch latest health" });
  }
};

/* ================= BSF STATUS ================= */
exports.getBSFStatus = async (req, res) => {
  res.json({
    stage: "Larva",
    age_days: 12,
    harvest_prediction: "8 days remaining",
  });
};
