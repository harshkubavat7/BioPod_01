import { useEffect, useState } from "react";
import { getBSFStatus } from "../api/api";

const STAGE_COLORS = {
  Egg: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  Larva: "bg-green-500/20 text-green-400 border-green-500/30",
  Pupa: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Adult: "bg-purple-500/20 text-purple-400 border-purple-500/30",
};

export default function BSFStage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchStatus() {
    try {
      const res = await getBSFStatus();
      setData(res.data);
      setError(false);
    } catch (err) {
      console.error("❌ BSF status error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // auto refresh
    return () => clearInterval(interval);
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 animate-pulse">
        <p className="text-zinc-400 text-sm">Loading BSF lifecycle…</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="bg-zinc-900 border border-red-500/30 rounded-xl p-4">
        <p className="text-red-400 text-sm">BSF lifecycle data unavailable</p>
      </div>
    );
  }

  /* ================= LOGIC ================= */

  const totalCycleDays = 20; // configurable later
  const progress = Math.min(
    100,
    Math.round((data.age_days / totalCycleDays) * 100)
  );

  const nextStage =
    data.stage === "Egg"
      ? "Larva"
      : data.stage === "Larva"
      ? "Pupa"
      : data.stage === "Pupa"
      ? "Adult"
      : "Completed";

  const badgeStyle =
    STAGE_COLORS[data.stage] ??
    "bg-zinc-700 text-zinc-300 border-zinc-600";

  /* ================= UI ================= */

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-lg space-y-4">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold tracking-wide text-zinc-200">
          🪱 BSF Lifecycle
        </h2>

        <span
          className={`px-3 py-1 text-xs rounded-full border ${badgeStyle}`}
        >
          {data.stage}
        </span>
      </div>
        
      {/* DETAILS */}
      <div className="space-y-2 text-sm text-zinc-300">
        <p>
          <span className="text-zinc-400">Age:</span>{" "}
          <span className="font-medium">{data.age_days} days</span>
        </p>

        <p>
          <span className="text-zinc-400">Harvest:</span>{" "}
          <span className="text-green-400">
            {data.harvest_prediction}
          </span>
        </p>

        <p>
          <span className="text-zinc-400">Next stage:</span>{" "}
          <span className="text-yellow-400">{nextStage}</span>
        </p>
      </div>

      {/* PROGRESS BAR */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-zinc-400">
          <span>Growth progress</span>
          <span>{progress}%</span>
        </div>

        <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* AI INSIGHT */}
      <div className="text-xs text-zinc-400 italic">
        🤖 AI Insight: Growth is{" "}
        <span className="text-green-400 font-medium">
          {progress > 60 ? "on track" : "developing"}
        </span>{" "}
        under current conditions.
      </div>

      {/* FOOTER */}
      {data.started_on && (
        <div className="text-[11px] text-zinc-500">
          Started on{" "}
          {new Date(data.started_on).toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata",
          })}
        </div>
      )}
    </div>
  );
}
