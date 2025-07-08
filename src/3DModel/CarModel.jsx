import { useGLTF } from "@react-three/drei";
import React, { useEffect } from "react";

const CarModel = ({ envMap }) => {
  const { scene } = useGLTF("/models/free_bmw_m3_e30.glb");

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Clear emissive if it's white or bright
        if (
          child.material.emissive &&
          child.material.emissive.isColor &&
          child.material.emissive.getHexString() !== "000000"
        ) {
          child.material.emissive.set("#000000"); // turn off glow
        }

        // 👇 Add environment map for reflections
        if (child.material && child.material.envMap === null) {
          child.material.envMap = envMap;
          child.material.envMapIntensity = 1; // adjust as needed
          child.material.needsUpdate = true;
        }
      }
    });
  }, [scene, envMap]);

  return (
    <primitive position={[0, -1.5, 0]} object={scene} scale={1} castShadow />
  );
};

export default CarModel;
