const BSFStageCard = ({ stage, confidence, transition }) => (
  <div className="bg-black/40 border border-white/10 rounded-lg p-5">
    <h3 className="text-lg font-semibold mb-2">🪱 BSF Stage Intelligence</h3>

    <p className="text-2xl font-bold text-green-400">
      {stage}
    </p>

    <p className="text-sm text-gray-400 mt-1">
      Confidence: {confidence}%
    </p>

    <div className="mt-3 text-sm text-gray-300">
      Next stage: <span className="font-semibold">{transition.nextStage}</span>
      <br />
      Estimated in: {transition.etaDays} day(s)
    </div>
  </div>
);

export default BSFStageCard;
