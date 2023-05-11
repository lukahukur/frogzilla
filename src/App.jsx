import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Vector3, Quaternion, Euler } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {
  Html,
  Text,
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import model from "../public/baba_yagas_hut.glb";

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} />;
}

function Scene() {
  const textRef = useRef();
  const [active, setActive] = useState(false);
  const { camera } = useThree();

  const target1 = new Vector3(0, 0, 5);
  const target2 = new Vector3(10, 10, 10);

  const quaternion1 = new Quaternion().setFromEuler(new Euler(0, 0, 0, "XYZ"));
  const quaternion2 = new Quaternion().setFromEuler(
    new Euler(0, Math.PI, 0, "XYZ")
  );

  const [targetPosition, setTargetPosition] = useState(target1);
  const [targetQuaternion, setTargetQuaternion] = useState(quaternion1);

  useEffect(() => {
    if (active) {
      setTargetPosition(target2);
      setTargetQuaternion(quaternion2);
    } else {
      setTargetPosition(target1);
      setTargetQuaternion(quaternion1);
    }
  }, [active]);

  useFrame(() => {
    camera.position.lerp(targetPosition, 0.05);
    camera.quaternion.slerp(targetQuaternion, 0.05);
    camera.updateProjectionMatrix();
  });

  return (
    <group>
      <Model url={model} />
      <Text
        color="black"
        fontSize={0.2}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
        textAlign={"left"}
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
        ref={textRef}
        onClick={() => setActive(!active)}
      >
        {active ? "Hello world2" : "Hello world"}
      </Text>
    </group>
  );
}

export default function App() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} />
      <directionalLight position={[0, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Environment preset="sunset" background />
        <Scene />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
