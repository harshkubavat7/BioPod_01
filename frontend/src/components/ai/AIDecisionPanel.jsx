// export default function AIDecisionPanel({ data }) {
//   const { anomaly, action } = data;

//   return (
//     <div className="bg-neutral-900 rounded-xl p-5 border border-white/5">
//       <h2 className="text-lg font-semibold text-white mb-4">
//         🛡️ AI Decision
//       </h2>

//       <p className="text-sm text-gray-400">Anomaly Status</p>
//       <p className={`text-lg ${anomaly.anomaly ? "text-yellow-400" : "text-green-400"}`}>
//         {anomaly.anomaly ? "Abnormal" : "Normal"}
//       </p>

//       <div className="mt-4">
//         <p className="text-sm text-gray-400">Recommended Action</p>
//         <p className="text-xl font-bold text-indigo-400">
//           {action.action}
//         </p>
//         <p className="text-xs text-gray-500 mt-1">
//           {action.reason}
//         </p>
//       </div>
//     </div>
//   );
// }

const AIDecisionPanel = ({ data }) => (
  <div className="bg-black/40 border border-white/10 rounded-lg p-5">
    <h3 className="text-lg font-semibold mb-2">AI Decision</h3>
    <p className="text-green-400 text-xl font-bold">
      {data.action.action}
    </p>
    <p className="text-gray-400 mt-1">{data.action.reason}</p>
  </div>
);

export default AIDecisionPanel;
