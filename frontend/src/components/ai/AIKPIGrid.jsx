// export default function AIKPIGrid({ data }) {
//   const anomaly = data.anomaly.anomaly;

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       <KPI title="System State" value={anomaly ? "Risk" : "Stable"} />
//       <KPI title="AI Confidence" value="92%" />
//       <KPI title="Active Risks" value={anomaly ? "1" : "0"} />
//       <KPI title="Learning Mode" value="Adaptive" />
//     </div>
//   );
// }

// function KPI({ title, value }) {
//   return (
//     <div className="bg-neutral-900 rounded-xl p-4 border border-white/5">
//       <p className="text-sm text-gray-400">{title}</p>
//       <p className="text-xl font-semibold text-white">{value}</p>
//     </div>
//   );
// }


const AIKPIGrid = ({ data }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <KPI title="System State" value={data.anomaly.anomaly ? "Alert" : "Stable"} />
    <KPI title="AI Confidence" value="92%" />
    <KPI title="Active Risks" value={data.anomaly.anomaly ? "1" : "0"} />
    <KPI title="Learning Mode" value="Adaptive" />
  </div>
);

const KPI = ({ title, value }) => (
  <div className="bg-black/40 border border-white/10 rounded-lg p-4">
    <p className="text-gray-400 text-sm">{title}</p>
    <p className="text-xl font-semibold text-green-400">{value}</p>
  </div>
);

export default AIKPIGrid;
