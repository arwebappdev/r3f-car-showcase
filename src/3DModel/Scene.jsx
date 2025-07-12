import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import {
  Environment,
  CubeCamera,
  GizmoHelper,
  GizmoViewcube,
  useProgress,
  Html,
} from "@react-three/drei";
import RoomModel from "./RoomModel";
import CarModel from "./CarModel";
import * as THREE from "three";
import gsap from "gsap";

// 🎯 Scroll camera positions
const cameraPositions = [
  new THREE.Vector3(0, -0.5, 4),
  new THREE.Vector3(1, -0.5, 3),
  new THREE.Vector3(2, -0.5, 3),
  new THREE.Vector3(2.5, -0.5, 1.5),
  new THREE.Vector3(5, -0.5, 0),
];

const AnimatedCamera = ({ progress }) => {
  const { camera } = useThree();
  const camRef = useRef(camera);

  // ✅ Use ref instead of state to avoid re-renders & race conditions
  const introDoneRef = useRef(false);

  useEffect(() => {
    // 🛑 Prevent camera animation race
    camRef.current.position.set(0, -0.6, 2.05);
    camRef.current.lookAt(0, -0.7, 1.999);

    const tl = gsap.timeline();

    tl.to(camRef.current.position, {
      x: 0,
      y: -0.5,
      z: 4,
      delay: 1,
      duration: 2,
      ease: "power3.out",
      onUpdate: () => {
        camRef.current.lookAt(0, -0.5, 0);
      },
      onComplete: () => {
        introDoneRef.current = true; // ✅ Start scroll animation after GSAP
      },
    });
  }, []);

  // ✅ Use scroll animation only after intro is done
  useFrame(() => {
    if (!introDoneRef.current) return;

    const index = Math.min(
      Math.floor(progress * (cameraPositions.length - 1)),
      cameraPositions.length - 2
    );
    const lerpFactor = (progress * (cameraPositions.length - 1)) % 1;

    const start = cameraPositions[index];
    const end = cameraPositions[index + 1];

    const interpolated = start.clone().lerp(end, lerpFactor);

    camRef.current.position.copy(interpolated);
    camRef.current.lookAt(0, -0.5, 0);
  });

  return null;
};

export default function Scene({ progress, onLoaded, onProgress }) {
  const { progress: loadProgress } = useProgress();

  useEffect(() => {
    if (onProgress) {
      onProgress(loadProgress); // 👈 pass to parent
    }

    if (loadProgress === 100 && onLoaded) {
      onLoaded(); // ✅ notify parent when fully loaded
    }
  }, [loadProgress, onLoaded, onProgress]);

  return (
    <Canvas shadows style={{ height: "100vh", width: "100vw" }}>
      {/* 🔄 Loading percentage */}
      {loadProgress < 100 && (
        <Html center>
          <div className="text-white text-xl">
            Loading... {Math.round(loadProgress)}%
          </div>
        </Html>
      )}

      {/* Lights */}
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 5, 5]} intensity={0.5} castShadow />

      {/* Camera */}
      <AnimatedCamera progress={progress} />

      {/* Models */}
      <RoomModel />
      <CubeCamera resolution={256} frames={1}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <CarModel envMap={texture} />
          </>
        )}
      </CubeCamera>

      {/* Debug UI */}
      <GizmoHelper>
        <GizmoViewcube />
      </GizmoHelper>
    </Canvas>
  );
}
