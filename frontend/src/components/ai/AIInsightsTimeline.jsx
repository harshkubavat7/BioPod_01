// export default function AIInsightsTimeline() {
//   return (
//     <div className="bg-neutral-900 rounded-xl p-5 border border-white/5">
//       <h2 className="text-lg font-semibold text-white mb-4">
//         🧾 AI Insights
//       </h2>

//       <ul className="text-sm text-gray-300 space-y-2">
//         <li>✔ Fan switched to AUTO mode</li>
//         <li>✔ Humidity stabilized</li>
//         <li>⚠ Air quality spike detected earlier</li>
//         <li>✔ System recovered</li>
//       </ul>
//     </div>
//   );
// }


const AIInsightsTimeline = () => (
  <div className="bg-black/40 border border-white/10 rounded-lg p-5">
    <h3 className="text-lg font-semibold mb-2">AI Insights</h3>
    <ul className="text-sm text-gray-300 space-y-2">
      <li>✔ Fan switched to AUTO mode</li>
      <li>✔ Humidity stabilized</li>
      <li>⚠ Minor air quality spike detected</li>
    </ul>
  </div>
);

export default AIInsightsTimeline;
