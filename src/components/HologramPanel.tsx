/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTime } from "../context/TimeContext";
import { Box, Scan, Database, AlertTriangle } from "lucide-react";
import confetti from "canvas-confetti";

export const HologramPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const { currentEra } = useTime();

  const handleScan = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: [currentEra.color, currentEra.accentColor, '#ffffff']
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm pointer-events-auto"
          onClick={onClose}
        >
          <motion.div 
            className="w-full max-w-2xl bg-black/80 border border-white/20 rounded-3xl p-10 relative overflow-hidden shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            onClick={e => e.stopPropagation()}
            style={{ borderColor: `${currentEra.color}44` }}
          >
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Scan className="text-cyan-400" />
                  <h2 className="font-mono text-sm uppercase tracking-[0.3em]">Temporal Relic Analyzer</h2>
                </div>
                <div className="text-[10px] font-mono p-1 px-3 bg-red-500/20 text-red-400 rounded-full border border-red-500/30 flex items-center gap-2">
                  <AlertTriangle size={12} />
                  Class I Anomaly Detected
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="aspect-square bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group overflow-hidden relative">
                    <Box size={60} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent"
                      animate={{ y: [100, -100] }}
                      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    />
                  </div>
                  <button 
                    onClick={handleScan}
                    className="w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-widest rounded-xl hover:bg-cyan-400 transition-colors"
                  >
                    Initiate Deep Scan
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Database size={14} className="text-cyan-400" />
                      <span className="text-[10px] font-mono text-white/40 uppercase">Object Metadata</span>
                    </div>
                    <p className="text-white text-lg font-display">Unknown Carbonized Fragment</p>
                    <p className="text-white/40 text-xs mt-1">Origin: {currentEra.year}</p>
                  </div>

                  <div className="p-4 space-y-3">
                    <p className="text-white/60 text-xs leading-relaxed italic">
                      "This fragment radiates a faint chronoton pulse. Preliminary analysis suggests it was part of a larger structure that shouldn't exist in this epoch."
                    </p>
                    <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-cyan-400"
                        initial={{ width: 0 }}
                        animate={{ width: '74%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                      />
                    </div>
                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-tighter text-right">Integrity: 74.2%</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={onClose}
                className="text-white/30 hover:text-white transition-colors text-[10px] font-mono uppercase tracking-[0.5em] block mx-auto pt-4 border-t border-white/5 w-full"
              >
                Close Terminal
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
