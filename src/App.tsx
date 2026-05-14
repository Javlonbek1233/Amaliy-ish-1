/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { TimeProvider } from "./context/TimeContext";
import { Portal } from "./components/Portal";
import { Timeline } from "./components/Timeline";
import { EraDetails } from "./components/EraDetails";
import { AIGuide } from "./components/AIGuide";
import { TravelOverlay } from "./components/TravelOverlay";
import { HologramPanel } from "./components/HologramPanel";
import { motion } from "motion/react";
import { Shield, Settings, User, Terminal } from "lucide-react";

export default function App() {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  return (
    <TimeProvider>
      <div className="relative w-full h-screen overflow-hidden bg-black font-sans selection:bg-white selection:text-black">
        {/* Background 3D Scene */}
        <Portal />

        {/* UI Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col justify-between p-10 pointer-events-none">
          {/* Top Bar */}
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center justify-between pointer-events-auto"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center">
                <Terminal className="text-white w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl uppercase tracking-tighter text-white">Chrono<span className="font-light opacity-50">Portal</span></h2>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Secure Temporal Uplink Active</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all">
                <Shield size={20} />
              </button>
              <button className="p-3 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all">
                <Settings size={20} />
              </button>
              <div className="h-8 w-px bg-white/10 mx-2" />
              <button className="flex items-center gap-3 p-1.5 pr-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-500 flex items-center justify-center">
                  <User size={16} className="text-white" />
                </div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/60">T-Officer: Javlon</span>
              </button>
            </div>
          </motion.div>

          {/* Left Side Details */}
          <EraDetails onOpenScanner={() => setIsPanelOpen(true)} />

          {/* Right Side Guide */}
          <AIGuide />

          {/* Bottom Timeline */}
          <Timeline />
        </div>

        {/* Hologram Scanner */}
        <HologramPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />

        {/* Cinematic Transitions */}
        <TravelOverlay />

        {/* Global Vignette */}
        <div className="fixed inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)] z-20" />
      </div>
    </TimeProvider>
  );
}
