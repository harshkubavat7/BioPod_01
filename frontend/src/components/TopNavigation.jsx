export default function TopNavigation({ setView }) {
  return (
    <div className="fixed top-4 right-6 z-50 flex gap-2">
      <button
        onClick={() => setView("BIOPOD1")}
        className="px-4 py-2 bg-zinc-800 text-sm rounded-lg hover:bg-zinc-700 shadow-lg"
      >
        Biopod-1
      </button>

      <button
        onClick={() => window.open("http://localhost:5173/", "_blank")}
        className="px-4 py-2 bg-zinc-800 text-sm rounded-lg hover:bg-zinc-700 shadow-lg"
      >
        Biopod-2
      </button>

      <button
        onClick={() => setView("AI")}
        className="px-4 py-2 bg-indigo-600 text-sm rounded-lg hover:bg-indigo-500 shadow-lg"
      >
        AI
      </button>
    </div>
  );
}
