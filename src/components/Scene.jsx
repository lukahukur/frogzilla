import React, { useState, useEffect } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3, Quaternion, Euler } from "three";
import { Html } from "@react-three/drei";
import model from "../../public/baba_yagas_hut.glb";

export const deg2rad = (degrees) => degrees * (Math.PI / 180);

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} />;
}

export default function Scene({
  setTargetCameraPosition,
  setTargetCameraQuaternion,
}) {
  const { camera, size } = useThree();

  camera.rotation.set(deg2rad(0), deg2rad(-140), deg2rad(0));

  const [targetTextPosition, setTargetTextPosition] = useState(
    new Vector3(0, 0, 0)
  );

  useEffect(() => {
    setTargetTextPosition(
      new Vector3(size.width / 2 - 200, size.height / 2 - 50, 0)
    );
  }, [size.width, size.height]);

  return (
    <group>
      <Model url={model} />
      <Html position={targetTextPosition}>
        <div className="fixed top-40 left-0 w-[200px] h-[100px] flex justify-center items-center bg-black opacity-50 text-white ">
          Hello world
        </div>
      </Html>
    </group>
  );
}
