/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum EraId {
  DINOSAUR = "dinosaur",
  ANCIENT_EGYPT = "ancient_egypt",
  MEDIEVAL = "medieval",
  PRESENT = "present",
  CYBERPUNK = "cyberpunk",
  PARALLEL = "parallel",
}

export interface Era {
  id: EraId;
  name: string;
  year: string;
  description: string;
  color: string;
  accentColor: string;
  threeJsMood: {
    fogColor: string;
    lightIntensity: number;
    rotationSpeed: number;
  };
}

export interface HistoricalEvent {
  title: string;
  description: string;
  year: string;
}
