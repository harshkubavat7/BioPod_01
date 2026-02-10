// import { useEffect, useState } from "react";
// import { getLocationStatus } from "../api/api";

// export default function Header() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await getLocationStatus();
//         setData(res.data);
//       } catch (err) {
//         console.error("Location fetch failed");
//       }
//     };

//     fetch();
//     const interval = setInterval(fetch, 60000); // every 1 min
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <header className="h-16 px-6 flex items-center justify-between border-b border-zinc-800">
//       <div>
//         <h1 className="text-lg font-bold text-green-400">BIOPOD AI</h1>
//         <p className="text-xs text-zinc-400">
//           Bio-Conversion Monitoring System
//         </p>
//       </div>

//       {data && (
//         <div className="text-sm text-zinc-300 flex items-center gap-6">
//           <span>📍 {data.location}</span>
//           <span>🌡 {data.temperature}°C</span>
//           <span>💧 {data.humidity}%</span>
//           <span>
//             🌫 AQI: {data.aqi} ({data.aqi_label})
//           </span>
//         </div>
//       )}
//     </header>
//   );
// }


// import { useEffect, useState } from "react";
// import { getLocationStatus } from "../api/api";

// export default function Header({ setView }) {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await getLocationStatus();
//         setData(res.data);
//       } catch (err) {
//         console.error("Location fetch failed");
//       }
//     };

//     fetch();
//     const interval = setInterval(fetch, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <header className="h-16 px-6 flex items-center justify-between border-b border-zinc-800">
      
//       {/* LEFT: TITLE */}
//       <div>
//         <h1 className="text-lg font-bold text-green-400">BIOPOD AI</h1>
//         <p className="text-xs text-zinc-400">
//           Bio-Conversion Monitoring System
//         </p>
//       </div>

//       {/* CENTER: LOCATION STATUS */}
//       {data && (
//         <div className="text-sm text-zinc-300 flex items-center gap-6">
//           <span>📍 {data.location}</span>
//           <span>🌡 {data.temperature}°C</span>
//           <span>💧 {data.humidity}%</span>
//           <span>
//             🌫 AQI: {data.aqi} ({data.aqi_label})
//           </span>
//         </div>
//       )}

//       {/* RIGHT: NAV BUTTONS */}
//       <div className="flex gap-2">
//         <button
//           onClick={() => setView("BIOPOD1")}
//           className="px-3 py-1.5 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700"
//         >
//           Biopod-1
//         </button>

//         <button
//           onClick={() => window.open("http://localhost:6000", "_blank")}
//           className="px-3 py-1.5 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700"
//         >
//           Biopod-2
//         </button>

//         <button
//           onClick={() => setView("AI")}
//           className="px-3 py-1.5 text-sm bg-indigo-600 rounded-lg hover:bg-indigo-500"
//         >
//           AI
//         </button>
//       </div>
//     </header>
//   );
// }


import { useEffect, useState } from "react";
import { getLocationStatus } from "../api/api";
// import TopNavigation from "./TopNavigation";
export default function Header({ setView }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getLocationStatus();
        setData(res.data);
      } catch {
        console.error("Location fetch failed");
      }
    };

    fetch();
    const interval = setInterval(fetch, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-zinc-800">

      {/* LEFT: TITLE + BUTTONS */}
      <div className="flex items-center gap-6">
        <div>
          <h1 className="text-lg font-bold text-green-400">BIOPOD AI</h1>
          <p className="text-xs text-zinc-400">
            Bio-Conversion Monitoring System
          </p>
        </div>

        {/* NAV BUTTONS (always visible) */}
        {/* <div className="flex gap-2"> */}
          {/* <button
            onClick={() => setView("BIOPOD1")}
            className="px-3 py-1.5 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700"
          >
            Biopod-1
          </button>

          <button
            onClick={() => window.open("http://localhost:6000", "_blank")}
            className="px-3 py-1.5 text-sm bg-zinc-800 rounded-lg hover:bg-zinc-700"
          >
            Biopod-2
          </button>

          <button
            onClick={() => setView("AI")}
            className="px-3 py-1.5 text-sm bg-indigo-600 rounded-lg hover:bg-indigo-500"
          >
            AI
          </button> */}

        {/* </div> */}
        {data && (
        <div className="hidden lg:flex text-sm text-zinc-300 items-center gap-6">
          <span>📍 {data.location}</span>
          <span>🌡 {data.temperature}°C</span>
          <span>💧 {data.humidity}%</span>
          <span>
            🌫 AQI: {data.aqi} ({data.aqi_label})
          </span>
        </div>
      )}
      </div>

      {/* <TopNavigation setView={setView} /> */}

      {/* RIGHT: LOCATION INFO */}
      
    </header>
  );
}
