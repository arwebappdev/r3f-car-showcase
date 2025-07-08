import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const SpotLightModel = ({ position = [0, 0, 0], target = [0, 0, 0] }) => {
  const { scene } = useGLTF("/models/spotlight.glb");

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.rotation.x = Math.PI; // 🔄 Flip upside down
    clone.rotation.y = Math.PI; // 🔄 Flip mirror
    return clone;
  }, [scene]);

  const modelRef = useRef();

  useEffect(() => {
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        // Remove unwanted emissive glow
        if (
          child.material?.emissive?.isColor &&
          child.material.emissive.getHexString() !== "000000"
        ) {
          child.material.emissive.set("#000000");
        }
      }
    });

    if (modelRef.current) {
      modelRef.current.lookAt(...target);
    }
  }, [clonedScene, target]);

  return (
    <group ref={modelRef} position={position}>
      <primitive object={clonedScene} scale={0.8} />
    </group>
  );
};

export default SpotLightModel;
