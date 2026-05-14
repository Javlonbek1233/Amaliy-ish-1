/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, PerspectiveCamera, MeshDistortMaterial, Trail, Float as FloatDrei } from "@react-three/drei";
import * as THREE from "three";
import { useTime } from "../context/TimeContext";

const WarpTunnel = () => {
  const { currentEra, isTraveling } = useTime();
  const tunnelRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z += currentEra.threeJsMood.rotationSpeed * (isTraveling ? 5 : 1) * 0.01;
      tunnelRef.current.position.z = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group>
      <Stars 
        radius={100} 
        depth={50} 
        count={5000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={isTraveling ? 10 : 1}
      />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh ref={tunnelRef}>
          <torusGeometry args={[10, 3, 16, 100]} />
          <MeshDistortMaterial
            color={currentEra.color}
            speed={isTraveling ? 5 : 1}
            distort={0.4}
            radius={1}
            wireframe
            opacity={0.3}
            transparent
          />
        </mesh>
      </Float>

      <pointLight position={[0, 0, 5]} intensity={currentEra.threeJsMood.lightIntensity * (isTraveling ? 10 : 1)} color={currentEra.accentColor} />
      <ambientLight intensity={0.2} />
      <fog attach="fog" args={[currentEra.threeJsMood.fogColor, 10, 50]} />
    </group>
  );
};

export const Portal = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 20]} />
        <WarpTunnel />
      </Canvas>
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none opacity-60" />
    </div>
  );
};
