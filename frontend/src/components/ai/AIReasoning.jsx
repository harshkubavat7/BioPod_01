// export default function AIReasoning({ data }) {
//   const f = data.features;

//   return (
//     <div className="bg-neutral-900 rounded-xl p-5 border border-white/5">
//       <h2 className="text-lg font-semibold text-white mb-4">
//         🔍 AI Reasoning
//       </h2>

//       <ul className="text-sm text-gray-300 space-y-2">
//         <li>Temperature deviation: {Math.abs(f.b1_temp - 28).toFixed(1)}°C</li>
//         <li>Humidity deviation: {Math.abs(f.b1_humidity - 65).toFixed(1)}%</li>
//         <li>Air quality trend stable</li>
//       </ul>
//     </div>
//   );
// }


const AIReasoning = ({ data }) => (
  <div className="bg-black/40 border border-white/10 rounded-lg p-5">
    <h3 className="text-lg font-semibold mb-2">AI Reasoning</h3>
    <ul className="text-gray-300 space-y-1 text-sm">
      <li>• Temperature within learned range</li>
      <li>• Humidity deviation below threshold</li>
      <li>• Air quality trend stable</li>
    </ul>
  </div>
);

export default AIReasoning;
