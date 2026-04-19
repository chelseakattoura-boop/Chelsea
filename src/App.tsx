/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BottomNav, View } from "./components/UI";
import { HomeView, RoutineView, LibraryView, ToolsView, ShopView, ProfileView } from "./components/Views";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("home");
  const [lifestyle, setLifestyle] = useState({
    water: 4,
    sleep: "good",
    stress: "low",
    hormonal: "normal",
    diet: [] as string[],
    sun: "low",
    screen: 4,
    activity: "none",
    environment: "dry",
    consistency: "completed",
    mood: "happy",
    extraHydration: "none",
    breakouts: [] as string[],
    experimentation: "none"
  });

  const [skinStatus, setSkinStatus] = useState({
    hydration: 70,
    redness: 10,
    irritation: 5,
    breakouts: 5,
    lastUpdated: "Yesterday"
  });

  // Mock historical data for the dashboard
  const [history] = useState([
    { day: "Mon", hydration: 65, redness: 15, irritation: 10, water: 3, stress: 8, sleep: 6 },
    { day: "Tue", hydration: 68, redness: 12, irritation: 8, water: 5, stress: 7, sleep: 7 },
    { day: "Wed", hydration: 72, redness: 10, irritation: 6, water: 6, stress: 5, sleep: 8 },
    { day: "Thu", hydration: 70, redness: 14, irritation: 9, water: 4, stress: 9, sleep: 5 },
    { day: "Fri", hydration: 75, redness: 8, irritation: 5, water: 7, stress: 4, sleep: 8 },
    { day: "Sat", hydration: 80, redness: 5, irritation: 3, water: 8, stress: 2, sleep: 9 },
    { day: "Sun", hydration: 78, redness: 7, irritation: 4, water: 7, stress: 3, sleep: 8 },
  ]);

  const renderView = () => {
    switch (currentView) {
      case "home": return (
        <HomeView 
          lifestyle={lifestyle} 
          skinStatus={skinStatus} 
          setSkinStatus={setSkinStatus} 
          setCurrentView={setCurrentView} 
          history={history}
        />
      );
      case "routine": return (
        <RoutineView 
          skinStatus={skinStatus} 
          lifestyle={lifestyle} 
          setLifestyle={setLifestyle} 
        />
      );
      case "library": return <LibraryView skinStatus={skinStatus} />;
      case "tools": return <ToolsView skinStatus={skinStatus} />;
      case "shop": return <ShopView skinStatus={skinStatus} />;
      case "profile": return <ProfileView />;
      default: return (
        <HomeView 
          lifestyle={lifestyle} 
          skinStatus={skinStatus} 
          setSkinStatus={setSkinStatus} 
          setCurrentView={setCurrentView} 
          history={history}
        />
      );
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 flex justify-center items-start transition-all duration-1000 ${lifestyle.sleep === "good" ? "ease-in-out" : "ease-linear"}`}>
      {/* Mobile Device Container */}
      <div className="w-full max-w-md h-[100dvh] bg-white relative overflow-hidden shadow-2xl border-x border-slate-100 flex flex-col">
        <main className="flex-1 relative z-10 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ 
                opacity: 1, 
                x: 0,
                skewX: lifestyle.stress === "high" ? [0, 0.5, -0.5, 0] : 0
              }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ 
                duration: lifestyle.sleep === "good" ? 0.5 : 0.3, 
                ease: "easeInOut",
                skewX: { duration: 0.2, repeat: Infinity }
              }}
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav active={currentView} onChange={setCurrentView} />
        
        {/* Background Decorative Elements (Scoped to Mobile Container) */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          {/* Water Fluid Level */}
          <motion.div 
            animate={{ 
              height: `${(lifestyle.water / 8) * 100}%`,
              backgroundColor: lifestyle.water > 6 ? "rgba(79, 195, 247, 0.1)" : "rgba(79, 195, 247, 0.05)"
            }}
            className="absolute bottom-0 left-0 right-0 transition-all duration-1000"
          />

          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [0, 50, 0],
              y: [0, -50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              x: [0, -30, 0],
              y: [0, 40, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-100/20 rounded-full blur-3xl" 
          />
        </div>
      </div>
    </div>
  );
}
