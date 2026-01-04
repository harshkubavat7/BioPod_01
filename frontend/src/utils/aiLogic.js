export function evaluateMetric(type, value, min, max) {
  if (value === null || value === undefined || isNaN(value)) {
    return {
      status: "Unknown",
      color: "#71717a",
      percent: 0,
      insight: "No data available",
      action: "Waiting for sensor data",
    };
  }

  // ✅ FIX: Absolute metrics use direct percentage
  const isAbsolute = type === "humidity" || type === "health";

  const percent = isAbsolute
    ? Math.min(100, Math.max(0, value)) // 👈 FIX HERE
    : Math.min(
        100,
        Math.max(0, ((value - min) / (max - min)) * 100)
      );

  switch (type) {
    case "temperature":
      if (value < 24)
        return out("Risk", "#ef4444", percent, "Too cold", "Increase temperature");
      if (value <= 30)
        return out("Excellent", "#22c55e", percent, "Optimal range", "No action needed");
      if (value <= 34)
        return out("Good", "#facc15", percent, "Slightly warm", "Monitor conditions");
      return out("Risk", "#ef4444", percent, "Too hot", "Improve ventilation");

    case "humidity":
      if (value < 55)
        return out("Risk", "#ef4444", percent, "Too dry", "Add moisture or wet feed");
      if (value <= 70)
        return out("Excellent", "#22c55e", percent, "Optimal moisture", "Stable");
      if (value <= 80)
        return out("Good", "#facc15", percent, "High humidity", "Monitor mold risk");
      return out("Risk", "#ef4444", percent, "Excess humidity", "Increase airflow");

    case "air":
      if (value < 600)
        return out("Good", "#22c55e", percent, "Fresh air", "Stable");
      if (value <= 1000)
        return out("Excellent", "#22c55e", percent, "Ideal AQ", "No action");
      if (value <= 1500)
        return out("Good", "#facc15", percent, "Moderate AQ", "Increase ventilation");
      return out("Risk", "#ef4444", percent, "Poor AQ", "Ventilation required");

    case "health":
      if (value >= 80)
        return out("Excellent", "#22c55e", percent, "System optimal", "Maintain setup");
      if (value >= 50)
        return out("Good", "#facc15", percent, "Moderate stability", "Monitor closely");
      return out("Risk", "#ef4444", percent, "System stressed", "Immediate action");

    default:
      return {
        status: "Unknown",
        color: "#71717a",
        percent: 0,
        insight: "Invalid metric",
        action: "Check configuration",
      };
  }
}

function out(status, color, percent, insight, action) {
  return { status, color, percent, insight, action };
}
