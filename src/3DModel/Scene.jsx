import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import {
  Environment,
  CubeCamera,
  GizmoHelper,
  GizmoViewcube,
} from "@react-three/drei";
import RoomModel from "./RoomModel";
import CarModel from "./CarModel";
import * as THREE from "three";

// Define multiple target positions
const cameraPositions = [
  new THREE.Vector3(3, 5, 2),
  new THREE.Vector3(0, -0.5, 4),
  new THREE.Vector3(4, -0.5, 0),
  new THREE.Vector3(2, 3, 5),
];

const AnimatedCamera = ({ progress }) => {
  const { camera } = useThree();
  const camRef = useRef(camera);

  useFrame(() => {
    const index = Math.min(
      Math.floor(progress * (cameraPositions.length - 1)),
      cameraPositions.length - 2
    );

    const lerpFactor = (progress * (cameraPositions.length - 1)) % 1;

    const start = cameraPositions[index];
    const end = cameraPositions[index + 1];

    const interpolated = start.clone().lerp(end, lerpFactor);

    camRef.current.position.copy(interpolated);
    camRef.current.lookAt(0, 0, 0);
  });

  return null;
};

export default function Scene({ progress }) {
  return (
    <Canvas shadows style={{ height: "100vh", width: "100vw" }}>
      <ambientLight intensity={0} />
      <pointLight position={[0, 5, 5]} intensity={0} castShadow />
      <AnimatedCamera progress={progress} />
      <RoomModel />
      <CubeCamera resolution={256} frames={1}>
        {(texture) => (
          <>
            <Environment map={texture} />
            <CarModel envMap={texture} />
          </>
        )}
      </CubeCamera>
      <GizmoHelper>
        <GizmoViewcube />
      </GizmoHelper>
    </Canvas>
  );
}
