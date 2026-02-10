import { useEffect, useState } from "react";
import axios from "axios";

export default function AIDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/ai/snapshot");
        setData(res.data);
      } catch (err) {
        setError("AI service unavailable");
      }
    };

    fetchAI();
    const interval = setInterval(fetchAI, 5000);
    return () => clearInterval(interval);
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p className="text-zinc-400">Loading AI data…</p>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">AI Decision Dashboard</h2>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <h3 className="font-medium mb-2">Anomaly Detection</h3>
        <p
          className={`font-semibold ${
            data.anomaly.anomaly ? "text-red-400" : "text-green-400"
          }`}
        >
          {data.anomaly.anomaly ? "Anomaly Detected" : "Normal"}
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <h3 className="font-medium mb-2">Recommended Action</h3>
        <p className="text-lg">{data.action.action}</p>
        <p className="text-sm text-zinc-400">{data.action.reason}</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <h3 className="font-medium mb-2">Reward</h3>
        <p>{data.reward}</p>
      </div>
    </div>
  );
}
