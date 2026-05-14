/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTime } from "../context/TimeContext";
import { getHistoricalInsights } from "../services/geminiService";
import { Bot, Send, Sparkles, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const AIGuide = () => {
  const { currentEra, isTraveling } = useTime();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(true);

  useEffect(() => {
    if (isTraveling) {
      setIsOpen(false);
      setResponse(null);
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isTraveling]);

  const speak = (text: string) => {
    if (!speechEnabled) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[#*`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setResponse(null);
    const result = await getHistoricalInsights(currentEra, query);
    setResponse(result);
    setIsLoading(false);
    setQuery("");
    speak(result);
  };

  return (
    <div className="fixed top-10 right-10 z-40">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl hover:bg-white/10 transition-colors relative group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Bot className="w-8 h-8 text-white" />
        <div 
          className="absolute inset-0 rounded-full blur-xl opacity-20 pointer-events-none"
          style={{ backgroundColor: currentEra.color }}
        />
        {isSpeaking && (
          <motion.div 
            className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          />
        )}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute top-20 right-0 w-[400px] bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white/70">Chrono-Companion</h3>
              </div>
              <button 
                onClick={() => setSpeechEnabled(!speechEnabled)}
                className="text-white/40 hover:text-white transition-colors"
              >
                {speechEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto no-scrollbar mb-6 space-y-4">
              {response ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="prose prose-invert prose-sm"
                >
                  <div className="text-white/90 leading-relaxed font-sans italic">
                    <ReactMarkdown>{response}</ReactMarkdown>
                  </div>
                </motion.div>
              ) : isLoading ? (
                <div className="p-4 flex flex-col items-center gap-2 opacity-50">
                  <motion.div 
                    className="w-8 h-8 border-2 border-t-transparent border-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  />
                  <p className="text-[10px] font-mono tracking-widest uppercase">Deciphering temporal data...</p>
                </div>
              ) : (
                <p className="text-white/40 text-sm italic py-4">Ask about the hidden secrets of the {currentEra.name}...</p>
              )}
            </div>

            <form onSubmit={handleAsk} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask Chronos..."
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors pr-12"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                disabled={isLoading}
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
