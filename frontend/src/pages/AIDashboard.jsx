// import { useEffect, useState } from "react";
// import { fetchAISnapshot } from "../api/aiApi";

// import AIHeader from "../components/ai/AIHeader";
// import AIKPIGrid from "../components/ai/AIKPIGrid";
// import AIDecisionPanel from "../components/ai/AIDecisionPanel";
// import AIReasoning from "../components/ai/AIReasoning";
// import AIInsightsTimeline from "../components/ai/AIInsightsTimeline";
// import AILearningPanel from "../components/ai/AILearningPanel";
// import BSFStageCard from "../components/ai/BSFStageCard";

// const AIDashboard = () => {
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadAI = async () => {
//       try {
//         const res = await fetchAISnapshot();
//         setData(res);
//       } catch (err) {
//         console.error("AI snapshot failed", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadAI();
//     const interval = setInterval(loadAI, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center text-gray-400 mt-10">
//         Initializing AI engine...
//       </div>
//     );
//   }

//   if (!data) {
//     return (
//       <div className="text-center text-red-500 mt-10">
//         AI service unavailable
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 space-y-6">
//       <AIHeader />

//       <AIKPIGrid data={data} />

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <AIDecisionPanel data={data} />
//         <AIReasoning data={data} />
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <AIInsightsTimeline />
//         <AILearningPanel data={data} />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         <BSFStageCard
//           stage={data.bsf.stage}
//           confidence={data.bsf.confidence}
//           transition={data.bsf.transition}
//         />
//       </div>
//     </div>
//   );
// };

// export default AIDashboard;


import { useEffect, useState } from "react";
import { fetchAISnapshot } from "../api/aiApi";

import AIHeader from "../components/ai/AIHeader";
import AIKPIGrid from "../components/ai/AIKPIGrid";
import AIDecisionPanel from "../components/ai/AIDecisionPanel";
import AIReasoning from "../components/ai/AIReasoning";
import AIInsightsTimeline from "../components/ai/AIInsightsTimeline";
import AILearningPanel from "../components/ai/AILearningPanel";
import BSFStageCard from "../components/ai/BSFStageCard";

const AIDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAI = async () => {
      try {
        const res = await fetchAISnapshot();
        setData(res);
        setError(null);
      } catch (err) {
        console.error("AI snapshot failed", err);
        setError("AI service unavailable");
      } finally {
        setLoading(false);
      }
    };

    loadAI();
    const interval = setInterval(loadAI, 30000);
    return () => clearInterval(interval);
  }, []);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="text-center text-gray-400 mt-10">
        Initializing AI engine…
      </div>
    );
  }

  /* ---------- ERROR ---------- */
  if (error || !data) {
    return (
      <div className="text-center text-red-500 mt-10">
        {error || "AI service unavailable"}
      </div>
    );
  }

  /* ---------- SAFE EXTRACTION ---------- */
  const stagePrediction = data.stage_prediction;
  const stageTransition = data.stage_transition;

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <AIHeader timestamp={data.timestamp} />

      {/* KPI GRID */}
      <AIKPIGrid data={data} />

      {/* DECISION + REASONING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIDecisionPanel data={data} />
        <AIReasoning data={data} />
      </div>

      {/* INSIGHTS + LEARNING */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AIInsightsTimeline />
        <AILearningPanel data={data} />
      </div>

      {/* BSF STAGE INTELLIGENCE */}
      {stagePrediction && stageTransition && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <BSFStageCard
            stage={stagePrediction.stage}
            confidence={stagePrediction.confidence}
            transition={stageTransition}
          />
        </div>
      )}
    </div>
  );
};

export default AIDashboard;
