/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTime } from "../context/TimeContext";
import { Info, History, ShieldAlert } from "lucide-react";

interface EraDetailsProps {
  onOpenScanner: () => void;
}

export const EraDetails = ({ onOpenScanner }: EraDetailsProps) => {
  const { currentEra, isTraveling } = useTime();

  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-10 z-30 w-full max-w-sm pointer-events-none">
      <AnimatePresence mode="wait">
        {!isTraveling && (
          <motion.div
            key={currentEra.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-auto flex flex-col gap-8"
          >
            {/* Main Header */}
            <div>
              <motion.span 
                className="font-mono text-xs uppercase tracking-[0.4em] mb-2 block"
                style={{ color: currentEra.color }}
              >
                Operational Epoch: {currentEra.year}
              </motion.span>
              <h1 className="text-7xl font-sans font-light tracking-tighter text-white mb-4 leading-none">
                {currentEra.name.split(' ')[0]}
                <br />
                <span className="font-bold opacity-80">{currentEra.name.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-white/60 text-lg leading-relaxed max-w-xs italic font-sans font-light">
                {currentEra.description}
              </p>
            </div>

            {/* Quick Stats/Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Atmospheric Data</h4>
                  <p className="text-sm font-sans text-white/80">Oxygen: 21% | Grav: 1.0G</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:border-white/30 transition-all">
                  <History size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Primary Anomaly</h4>
                  <p className="text-sm font-sans text-white/80">Temporal Instability: 0.04%</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-red-500/50 group-hover:text-red-500 group-hover:border-red-500/30 transition-all">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-red-500/50">Travel Warning</h4>
                  <p className="text-sm font-sans text-red-500/80 underline cursor-pointer decoration-dotted underline-offset-4">Avoid direct ancestor contact</p>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenScanner}
              className="w-fit px-8 py-3 bg-white text-black text-xs font-mono uppercase tracking-widest rounded-sm hover:bg-white/90 transition-colors pointer-events-auto"
            >
              Scan Localized Relics
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
