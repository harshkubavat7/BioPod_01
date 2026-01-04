import { useEffect, useState } from "react";
import { getAIInsights } from "../api/api";

export default function AIStatus() {
  const [ai, setAI] = useState(null);

  useEffect(() => {
    getAIInsights().then(res => setAI(res.data));
  }, []);

  if (!ai) return <p>Loading AI...</p>;

  return (
    <div style={card}>
      <h2>🧠 AI Status</h2>
      <p>Health Score: {ai.health_score}</p>
      <p>Status: {ai.health_status}</p>
      <p>BSF Stage: {ai.bsf_stage}</p>

      <ul>
        {ai.health_reasons.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

const card = {
  padding: "20px",
  borderRadius: "10px",
  background: "#222",
  color: "#fff",
};
