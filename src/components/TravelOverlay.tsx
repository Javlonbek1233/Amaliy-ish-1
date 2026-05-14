/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTime } from "../context/TimeContext";

export const TravelOverlay = () => {
  const { isTraveling, currentEra } = useTime();

  return (
    <AnimatePresence>
      {isTraveling && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-transparent"
        >
          {/* Flash Effect */}
          <motion.div 
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.5, times: [0, 0.2, 1] }}
          />

          {/* Text Warp */}
          <div className="relative text-center">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: "blur(20px)" }}
              animate={{ scale: 1.5, opacity: [0, 1, 0], filter: "blur(0px)" }}
              transition={{ duration: 1.5 }}
              className="text-white font-mono text-4xl uppercase tracking-[1em]"
            >
              Calibrating Epoch
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-4 text-cyan-400 font-mono text-xs uppercase tracking-widest"
            >
              Synchronizing Chrono-Link...
            </motion.div>
          </div>

          {/* Particles/Lines */}
          <div className="absolute inset-0 overflow-hidden">
             {[...Array(20)].map((_, i) => (
               <motion.div
                 key={i}
                 className="absolute bg-white/20 h-[1px] w-full"
                 style={{ top: `${Math.random() * 100}%` }}
                 animate={{ x: [-1000, 1000], opacity: [0, 1, 0] }}
                 transition={{ duration: 0.5, delay: Math.random() * 0.5, repeat: Infinity }}
               />
             ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
