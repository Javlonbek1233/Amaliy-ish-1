/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Era, EraId } from "./types";

export const ERAS: Era[] = [
  {
    id: EraId.DINOSAUR,
    name: "Prehistoric Dawn",
    year: "65 Million BCE",
    description: "The age of giants. Massive reptiles roam a lush, untamed world under a younger sun.",
    color: "#2ecc71",
    accentColor: "#27ae60",
    threeJsMood: {
      fogColor: "#0a2a16",
      lightIntensity: 1.5,
      rotationSpeed: 0.2,
    },
  },
  {
    id: EraId.ANCIENT_EGYPT,
    name: "Golden Pharaohs",
    year: "2500 BCE",
    description: "The dawn of civilization. Pyramids rise from the sands, testament to human ingenuity and eternal ambition.",
    color: "#f1c40f",
    accentColor: "#f39c12",
    threeJsMood: {
      fogColor: "#2e1e0a",
      lightIntensity: 2.0,
      rotationSpeed: 0.3,
    },
  },
  {
    id: EraId.MEDIEVAL,
    name: "Age of Knights",
    year: "1200 CE",
    description: "Stone fortresses and chivalric honor. A time of discovery, faith, and the clash of empires.",
    color: "#e74c3c",
    accentColor: "#c0392b",
    threeJsMood: {
      fogColor: "#1a0505",
      lightIntensity: 0.8,
      rotationSpeed: 0.1,
    },
  },
  {
    id: EraId.PRESENT,
    name: "The Digital Age",
    year: "2024 CE",
    description: "The peak of connectivity. A world woven by fiber optics and silicon, standing on the precipice of the future.",
    color: "#3498db",
    accentColor: "#2980b9",
    threeJsMood: {
      fogColor: "#05111a",
      lightIntensity: 1.2,
      rotationSpeed: 0.4,
    },
  },
  {
    id: EraId.CYBERPUNK,
    name: "Neo-Synthetic",
    year: "2099 CE",
    description: "Neon rain and high-density mega-cities. Humanity and technology have become inseparable.",
    color: "#9b59b6",
    accentColor: "#8e44ad",
    threeJsMood: {
      fogColor: "#1a0a2a",
      lightIntensity: 2.5,
      rotationSpeed: 0.8,
    },
  },
  {
    id: EraId.PARALLEL,
    name: "Looming Void",
    year: "Unknown",
    description: "A reality where the laws of physics are suggestions. Colors breathe and time flows like liquid glass.",
    color: "#1abc9c",
    accentColor: "#16a085",
    threeJsMood: {
      fogColor: "#051a16",
      lightIntensity: 1.0,
      rotationSpeed: 1.5,
    },
  },
];
