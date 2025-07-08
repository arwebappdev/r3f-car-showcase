import React, { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { ContactShadows, Environment, useHelper } from "@react-three/drei";
import { PointLightHelper, SpotLightHelper } from "three";
import CarLights from "./CarLights";
import SpotLightModel from "./SpotLightModel";
import { useFrame } from "@react-three/fiber";

export default function RoomModel() {
  const leftLightRef = useRef();
  const rightLightRef = useRef();

  // 🔧 Show spot light helpers
  useHelper(leftLightRef, SpotLightHelper, "red");
  useHelper(rightLightRef, PointLightHelper, "red");

  const imageTexture = useLoader(THREE.TextureLoader, "/ar.png");
  imageTexture.encoding = THREE.sRGBEncoding;
  imageTexture.magFilter = THREE.NearestFilter;
  imageTexture.minFilter = THREE.LinearFilter;

  const sfl = useRef();
  const sfr = useRef();
  const sbl = useRef();
  const sbr = useRef();
  const tfl = useRef();
  const tfr = useRef();
  const tbl = useRef();
  const tbr = useRef();

  useFrame(() => {
    if (sfl.current && tfl.current) {
      sfl.current.target.updateMatrixWorld();
    }
    if (sfr.current && tfr.current) {
      sfr.current.target.updateMatrixWorld();
    }
    if (sbl.current && tbl.current) {
      sbl.current.target.updateMatrixWorld();
    }
    if (sbr.current && tbr.current) {
      sbr.current.target.updateMatrixWorld();
    }
  });
  useEffect(() => {
    if (sfl.current && tfl.current) {
      sfl.current.target = tfl.current;
    }
    if (sfr.current && tfr.current) {
      sfr.current.target = tfr.current;
    }
    if (sbl.current && tbl.current) {
      sbl.current.target = tbl.current;
    }
    if (sbr.current && tbr.current) {
      sbr.current.target = tbr.current;
    }
  }, []);

  return (
    <>
      {/*<Environment preset="warehouse" background={false} />*/}
      {/* Room walls */}
      <mesh position={[0, 0, -5]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#777" metalness={0} roughness={1} />
      </mesh>
      <mesh position={[0, 0, 5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#777" metalness={0} roughness={1} />
      </mesh>
      <mesh position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#777" metalness={0} roughness={1} />
      </mesh>
      <mesh position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial color="#777" metalness={0} roughness={1} />
      </mesh>

      {/* Front Wall Image */}
      <mesh position={[0, 0, -4.99]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial
          map={imageTexture}
          transparent
          toneMapped={true}
          depthWrite={false}
          metalness={0}
          roughness={1}
        />
      </mesh>

      {/* Back Wall Image */}
      <mesh position={[0, 0, 4.99]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshStandardMaterial
          map={imageTexture}
          transparent
          toneMapped={true}
          depthWrite={false}
          metalness={0}
          roughness={1}
        />
      </mesh>

      {/* Left Wall Image */}
      {/*<mesh position={[-4.99, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshBasicMaterial
          map={imageTexture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>*/}

      {/* Right Wall Image */}
      {/*<mesh position={[4.99, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[10, 3]} />
        <meshBasicMaterial
          map={imageTexture}
          transparent
          toneMapped={false}
          depthWrite={false}
        />
      </mesh>*/}

      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
        metalness={0}
        roughness={1}
        receiveShadow
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#222" />
      </mesh>

      {/* Ceiling */}
      <group position={[0, 1.501, 0]} rotation={[Math.PI / 2, 0, 0]}>
        {/* Background plane (ceiling base) */}
        <mesh>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive={"#ffffaa"}
            emissiveIntensity={0}
            metalness={0}
            roughness={1}
          />
        </mesh>

        {/* Vertical grid bars (6 lines for 5 columns) */}
        {[...Array(6)].map((_, i) => (
          <mesh key={`v-${i}`} position={[-5 + i * 2, 0, 0]}>
            <boxGeometry args={[0.05, 10, 0.01]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        ))}

        {/* Horizontal grid bars (6 lines for 5 rows) */}
        {[...Array(6)].map((_, i) => (
          <mesh key={`h-${i}`} position={[0, -5 + i * 2, 0]}>
            <boxGeometry args={[10, 0.05, 0.01]} />
            <meshStandardMaterial color="#555" />
          </mesh>
        ))}
      </group>

      <group>
        {[
          [-4.2, 0.8, -4.2, -1, -0.8, -1.5, sfl, tfl], // Front-left
          [4.2, 0.8, -4.2, 1, -0.8, -1.5, sfr, tfr], // Front-right
          [-4.2, 0.8, 4.2, -1, -0.8, 1.5, sbl, tbl], // Back-left
          [4.2, 0.8, 4.2, 1, -0.8, 1.5, sbr, tbr], // Back-right
        ].map(([x, y, z, a, b, c, spos, tpos], i) => (
          <>
            <SpotLightModel
              key={i}
              position={[x, y, z]}
              target={[0, -0.8, 0]} // Center of floor
            />
            <spotLight
              ref={spos}
              position={[
                x + (x < 0 ? -0.09 : 0.09),
                y + 0.09,
                z + (z < 0 ? -0.09 : 0.09),
              ]}
              angle={Math.PI / 9}
              penumbra={1}
              intensity={25}
              distance={10}
              decay={1}
              castShadow
            />
            <object3D ref={tpos} position={[a, b, c]} />
            <pointLight
              position={[
                x + (x < 0 ? -0.09 : 0.09),
                y + 0.09,
                z + (z < 0 ? -0.09 : 0.09),
              ]}
              intensity={1}
              distance={0.2}
            />
            <mesh
              position={[
                x + (x < 0 ? -0.15 : 0.15),
                y + 0.15,
                z + (z < 0 ? -0.15 : 0.15),
              ]}
              visible={false}
              castShadow
            >
              <sphereGeometry args={[0.1, 32, 32]} />
              <meshStandardMaterial
                color="#ffffff"
                metalness={0}
                roughness={1}
                emissive="#ffffff"
                emissiveIntensity={1}
                envMapIntensity={1.5}
              />
            </mesh>
          </>
        ))}
      </group>

      {/* === Headlights === */}
      <CarLights />
    </>
  );
}
