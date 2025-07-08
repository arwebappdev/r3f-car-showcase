import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const CarLights = () => {
  const spotLightRef = useRef();
  const spotLight2Ref = useRef();
  const targetRef = useRef();
  const target2Ref = useRef();
  const spotLightBRef = useRef();
  const spotLightB2Ref = useRef();
  const targetBRef = useRef();
  const targetB2Ref = useRef();

  // Show helper for visualization
  //useHelper(spotLightRef, THREE.SpotLightHelper, "white");
  // Update spotlight target each frame (needed if the target moves)
  useFrame(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target.updateMatrixWorld();
    }
    if (spotLight2Ref.current && target2Ref.current) {
      spotLight2Ref.current.target.updateMatrixWorld();
    }
    if (spotLightBRef.current && targetBRef.current) {
      spotLightBRef.current.target.updateMatrixWorld();
    }
    if (spotLightB2Ref.current && targetB2Ref.current) {
      spotLightB2Ref.current.target.updateMatrixWorld();
    }
  });
  useEffect(() => {
    if (spotLightRef.current && targetRef.current) {
      spotLightRef.current.target = targetRef.current;
    }
    if (spotLight2Ref.current && target2Ref.current) {
      spotLight2Ref.current.target = target2Ref.current;
    }
    if (spotLightBRef.current && targetBRef.current) {
      spotLightBRef.current.target = targetBRef.current;
    }
    if (spotLightB2Ref.current && targetB2Ref.current) {
      spotLightB2Ref.current.target = targetB2Ref.current;
    }
  }, []);
  return (
    <group position={[0, 0, 0]}>
      <spotLight
        ref={spotLightRef}
        color={"#FFFAA0"}
        position={[0.49, -0.9, 1.9]} // position above and behind
        angle={Math.PI / 5.5} // spotlight cone angle
        penumbra={1} // softness
        intensity={15}
        distance={5}
        decay={1}
      />
      {/* 👇 This object will be the target the light points at */}
      <object3D ref={targetRef} position={[0.6, -0.5, 5.97]} />

      {/* Right Second headlight sphere */}
      <mesh position={[0.588, -0.9, 1.89]} castShadow>
        <sphereGeometry args={[0.044, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.5}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Right Second headlight point light */}
      <pointLight
        color={"#FFFAA0"}
        position={[0.588, -0.9, 1.97]}
        intensity={1}
        decay={1}
        distance={0.2}
        castShadow
      />

      {/* Right headlight sphere */}
      {/*<mesh position={[0.415, -0.9, 1.94]} castShadow>
        <sphereGeometry args={[0.015, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.0}
          emissive="#ffffff"
          emissiveIntensity={0.5}
          envMapIntensity={1.5}
        />
      </mesh>*/}

      {/* Right headlight point light */}
      <pointLight
        color={"#FFFAA0"}
        position={[0.415, -0.9, 1.97]}
        intensity={1}
        decay={1}
        distance={0.2}
        castShadow
      />

      <spotLight
        ref={spotLight2Ref}
        color={"#FFFAA0"}
        position={[-0.49, -0.9, 1.9]} // position above and behind
        angle={Math.PI / 5.5} // spotlight cone angle
        penumbra={1} // softness
        intensity={15}
        distance={5}
        decay={1}
      />
      {/* 👇 This object will be the target the light points at */}
      <object3D ref={target2Ref} position={[-0.6, -0.5, 5.97]} />

      {/* Left Second headlight sphere */}
      <mesh position={[-0.588, -0.9, 1.89]} castShadow>
        <sphereGeometry args={[0.044, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.1}
          emissive="#ffffff"
          emissiveIntensity={0.5}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* Left Second headlight point light */}
      <pointLight
        color={"#FFFAA0"}
        position={[-0.588, -0.9, 1.97]}
        intensity={1}
        decay={1}
        distance={0.2}
        castShadow
      />

      {/* Left headlight sphere */}
      {/*<mesh position={[-0.415, -0.9, 1.94]} castShadow>
        <sphereGeometry args={[0.015, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.0}
          emissive="#ffffff"
          emissiveIntensity={0.5}
          envMapIntensity={1.5}
        />
      </mesh>*/}
      {/* Left headlight point light */}
      <pointLight
        color={"#FFFAA0"}
        position={[-0.415, -0.9, 1.97]}
        intensity={1}
        decay={1}
        distance={0.2}
        castShadow
      />

      {/**====Taillights==== */}

      {/**Right */}
      <spotLight
        ref={spotLightBRef}
        color={"red"}
        position={[-0.54, -0.85, -3]} // position above and behind
        angle={Math.PI / 2} // spotlight cone angle
        penumbra={1} // softness
        intensity={1}
        distance={5}
        decay={1}
      />
      {/* 👇 This object will be the target the light points at */}
      <object3D ref={targetBRef} position={[-0.54, -0.85, -5]} />

      <mesh
        rotation={[Math.PI / 10.3, -Math.PI / 0.5042, Math.PI / 2.025]}
        position={[-0.532, -0.843, -2.3701]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.245, // radiusTop
            0.245, // radiusBottom
            0.299, // height
            10, // radialSegments
            1, // heightSegments
            true, // openEnded
            0, // thetaStart (in radians)
            Math.PI / 5.4, // thetaLength (quarter circle = 90 degrees)
          ]}
        />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.0}
          metalness={1}
          roughness={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight
        color={"#ff0000"}
        position={[-0.54, -0.85, -2.14]}
        intensity={0.6}
        decay={0.9}
        distance={0.24}
      />
      <pointLight
        color={"#ff0000"}
        position={[-0.43, -0.85, -2.14]}
        intensity={1}
        decay={0.9}
        distance={0.24}
      />
      <pointLight
        color={"#ff0000"}
        position={[-0.63, -0.85, -2.14]}
        intensity={0.6}
        decay={0.9}
        distance={0.24}
      />

      {/**left */}
      <spotLight
        ref={spotLightB2Ref}
        color={"red"}
        position={[0.54, -0.85, -3]} // position above and behind
        angle={Math.PI / 2} // spotlight cone angle
        penumbra={1} // softness
        intensity={1}
        distance={5}
        decay={1}
      />
      {/* 👇 This object will be the target the light points at */}
      <object3D ref={targetB2Ref} position={[0.54, -0.85, -5]} />

      <mesh
        rotation={[Math.PI / 10.3, Math.PI / 0.5052, Math.PI / 1.979]}
        position={[0.534, -0.843, -2.3701]}
        castShadow
      >
        <cylinderGeometry
          args={[
            0.245, // radiusTop
            0.245, // radiusBottom
            0.299, // height
            5, // radialSegments
            1, // heightSegments
            true, // openEnded
            0, // thetaStart (in radians)
            Math.PI / 5.4, // thetaLength (quarter circle = 90 degrees)
          ]}
        />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.0}
          metalness={1}
          roughness={1}
          side={THREE.DoubleSide}
        />
      </mesh>

      <pointLight
        color={"#ff0000"}
        position={[0.54, -0.85, -2.14]}
        intensity={0.6}
        decay={0.9}
        distance={0.24}
      />
      <pointLight
        color={"#ff0000"}
        position={[0.43, -0.85, -2.14]}
        intensity={1}
        decay={0.9}
        distance={0.24}
      />
      <pointLight
        color={"#ff0000"}
        position={[0.63, -0.85, -2.14]}
        intensity={0.6}
        decay={0.9}
        distance={0.24}
      />
    </group>
  );
};

export default CarLights;
