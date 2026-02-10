import useSensorData from "./hooks/useSensorData";
import useHealthData from "./hooks/useHealthData";

// Components
import BSFStage from "./components/BSFStage";
import HealthGauge from "./components/HealthGauge";
import FanControl from "./components/FanControl";
import SensorGraphs from "./components/SensorGraphs";
import FeedTracker from "./components/FeedTracker";
import AIRA from "./components/AIRA.JSX";
import Header from "./components/Header";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AIInsightsStrip from "./components/AIInsightsStrip";
import KPICards from "./components/KPICards";
import { useState } from "react";
// import AIDashboard from "./components/AIDashboard";
import AIDashboard from "./pages/AIDashboard";
import TopNavigation from "./components/TopNavigation";

export default function App() {
  const sensor = useSensorData();
  const healthScore = useHealthData();
  const [view, setView] = useState("BIOPOD1");

  return (
    <div className="min-h-screen w-full bg-zinc-950 text-zinc-100">

      {/* ================= HEADER ================= */}
      {/* <Header /> */}
      <Header />
      <TopNavigation setView={setView} />

      <AIInsightsStrip />

      {/* DASHBOARD NAV */}
{/* <div className="flex gap-3 px-6 py-3 border-b border-zinc-800 bg-zinc-950 sticky top-16 z-40">
  <button
    onClick={() => setView("BIOPOD1")}
    className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
  >
    Biopod-1
  </button>

  <button
    onClick={() => window.open("http://localhost:6000", "_blank")}
    className="px-4 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
  >
    Biopod-2
  </button>

  <button
    onClick={() => setView("AI")}
    className="px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-500"
  >
    AI
  </button>
</div> */}


      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-12 gap-6 p-6">

        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="col-span-12 xl:col-span-3 space-y-6">

          {/* BSF Lifecycle */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <BSFStage />
          </div>

          {/* AI Health Gauge */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex justify-center">
            {healthScore !== null ? (
              <HealthGauge score={healthScore} />
            ) : (
              <p className="text-zinc-500">Loading health…</p>
            )}
          </div>

          {/* Fan Control */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <FanControl />
          </div>

        </aside>

        {/* ================= MAIN CONTENT ================= */}
        {/* <main className="col-span-12 xl:col-span-9 space-y-6"> */}

          {/* ================= KPI CARDS ================= */}
          {/* <KPICards
            sensor={sensor}
            healthScore={healthScore}
          /> */}


          {/* ================= SENSOR GRAPHS ================= */}
          {/* <SensorGraphs /> */}

          {/* ================= FEED TRACKER ================= */}
          {/* <FeedTracker /> */}

          {/* ================= AI ASSISTANT ================= */}
          {/* <AIRA /> */}

        {/* </main> */}

        <main className="col-span-12 xl:col-span-9 space-y-6">

  {view === "BIOPOD1" && (
    <>
      <KPICards sensor={sensor} healthScore={healthScore} />
      <SensorGraphs />
      <FeedTracker />
      <AIRA />
    </>
  )}

  {view === "AI" && <AIDashboard />}

</main>



      </div>
    </div>
  );
}

