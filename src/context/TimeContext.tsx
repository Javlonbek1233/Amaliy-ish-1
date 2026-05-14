/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Era, EraId } from "../types";
import { ERAS } from "../constants";

interface TimeContextType {
  currentEra: Era;
  setEra: (id: EraId) => void;
  isTraveling: boolean;
}

const TimeContext = createContext<TimeContextType | undefined>(undefined);

export const TimeProvider = ({ children }: { children: ReactNode }) => {
  const [currentEra, setCurrentEra] = useState<Era>(ERAS.find(e => e.id === EraId.PRESENT)!);
  const [isTraveling, setIsTraveling] = useState(false);

  const setEra = (id: EraId) => {
    if (id === currentEra.id) return;
    setIsTraveling(true);
    setTimeout(() => {
      const nextEra = ERAS.find(e => e.id === id);
      if (nextEra) setCurrentEra(nextEra);
      setTimeout(() => {
        setIsTraveling(false);
      }, 1000);
    }, 1500);
  };

  return (
    <TimeContext.Provider value={{ currentEra, setEra, isTraveling }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTime = () => {
  const context = useContext(TimeContext);
  if (!context) throw new Error("useTime must be used within a TimeProvider");
  return context;
};
