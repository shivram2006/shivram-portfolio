"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function AbstractCore() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.18;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        state.pointer.y * 0.25,
        0.05
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -state.pointer.x * 0.2,
        0.05
      );
    }
    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.25;
      ringRef.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group ref={groupRef} position={[1.4, 0, 0]}>
      <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh>
          <icosahedronGeometry args={[1.35, 4]} />
          <MeshDistortMaterial
            color="#3b82f6"
            emissive="#4f46e5"
            emissiveIntensity={0.45}
            roughness={0.22}
            metalness={0.78}
            distort={0.28}
            speed={1.8}
          />
        </mesh>

        <mesh scale={1.58}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.22} />
        </mesh>

        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.15, 0.018, 16, 120]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.45} />
        </mesh>
      </Float>
    </group>
  );
}

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 240;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 9;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.025;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#60a5fa"
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export function HeroCanvas() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 5, 5]} intensity={1.8} color="#60a5fa" />
        <pointLight position={[-4, -3, 2]} intensity={1.5} color="#a855f7" />
        <AbstractCore />
        <ParticleField />
        <Sparkles
          count={45}
          scale={[10, 6, 4]}
          size={1.6}
          speed={0.35}
          color="#93c5fd"
          opacity={0.5}
        />
      </Canvas>
    </div>
  );
}
