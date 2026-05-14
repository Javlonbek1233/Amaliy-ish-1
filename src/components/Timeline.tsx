/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTime } from "../context/TimeContext";
import { ERAS } from "../constants";
import { EraId } from "../types";
import { Zap, Clock, Orbit, Radio, Cpu, History } from "lucide-react";

const getIcon = (id: EraId) => {
  switch (id) {
    case EraId.DINOSAUR: return <History className="w-5 h-5" />;
    case EraId.ANCIENT_EGYPT: return <Orbit className="w-5 h-5" />;
    case EraId.MEDIEVAL: return <Clock className="w-5 h-5" />;
    case EraId.PRESENT: return <Radio className="w-5 h-5" />;
    case EraId.CYBERPUNK: return <Cpu className="w-5 h-5" />;
    case EraId.PARALLEL: return <Zap className="w-5 h-5" />;
  }
};

export const Timeline = () => {
  const { currentEra, setEra, isTraveling } = useTime();

  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 px-6 py-4 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-4 shadow-2xl">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-[80vw]">
        {ERAS.map((era) => {
          const isActive = currentEra.id === era.id;
          return (
            <motion.button
              key={era.id}
              onClick={() => setEra(era.id)}
              disabled={isTraveling}
              className={`relative group px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-500 ${
                isActive ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-white/5 rounded-full border border-white/20"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 transition-colors" style={{ color: isActive ? era.color : undefined }}>
                {getIcon(era.id)}
              </span>
              <span className="relative z-10 text-xs font-mono tracking-tighter hidden md:block">
                {era.name}
              </span>

              {/* Hover Glow */}
              <div 
                className="absolute -inset-1 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500"
                style={{ backgroundColor: era.color }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
