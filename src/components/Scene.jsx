import React, { useState, useEffect } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3, Quaternion, Euler } from "three";
import { Html } from "@react-three/drei";
import model from "../../public/baba_yagas_hut.glb";

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} />;
}

export default function Scene({
  setTargetCameraPosition,
  setTargetCameraQuaternion,
}) {
  const { camera, size } = useThree();

  const startPosition = new Vector3(
    -3.4715597108145526,
    0.7726918437760153,
    -1.232442542015795
  );

  const targetPosition = new Vector3(
    -3.2956657823170303,
    2.931572680090176,
    3.7056299030550495
  );

  const startQuaternion = new Quaternion().setFromEuler(
    new Euler(0, 0, 0, "XYZ")
  );

  const targetQuaternion = new Quaternion().setFromEuler(
    new Euler(0, Math.PI, 0, "XYZ")
  );

  const [targetTextPosition, setTargetTextPosition] = useState(
    new Vector3(0, 0, 0)
  );

  const [isMoving, setIsMoving] = useState(false);

  useFrame(() => {
    if (isMoving) {
      camera.position.lerp(targetPosition, 0.05);
      camera.quaternion.slerp(targetQuaternion, 0.05);
      camera.updateProjectionMatrix();

      if (camera.position.distanceTo(targetPosition) < 0.1) {
        setIsMoving(false);
        setTargetCameraPosition(targetPosition);
        setTargetCameraQuaternion(targetQuaternion);
      }
    }
  });

  useEffect(() => {
    setTargetTextPosition(
      new Vector3(size.width / 2 - 100, size.height / 2 - 50, 0)
    );
  }, [size.width, size.height]);

  return (
    <group>
      <Model url={model} />
      <Html position={targetTextPosition}>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 200,
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            fontSize: 24,
            pointerEvents: "none",
          }}
        >
          Hello world
        </div>
      </Html>
    </group>
  );
}
