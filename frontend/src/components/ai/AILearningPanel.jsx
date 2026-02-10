export default function AILearningPanel({ data }) {
  return (
    <div className="bg-neutral-900 rounded-xl p-5 border border-white/5">
      <h2 className="text-lg font-semibold text-white mb-4">
        📈 Learning & Prediction
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <Info label="Reward" value={data.reward} />
        <Info label="Memory Window" value="Last 200 samples" />
        <Info label="Learning Type" value="Online Adaptive" />
        <Info label="Prediction" value="Stable BSF growth expected" />
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm text-white">{value}</p>
    </div>
  );
}
