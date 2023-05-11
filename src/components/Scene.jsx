import React, { useState } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from "@react-three/drei";
import model from "../../public/baba_yagas_hut.glb";

export const deg2rad = (degrees) => degrees * (Math.PI / 180);

function Model({ url }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} dispose={null} />;
}

export default function Scene() {
  const { camera } = useThree();
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 });

  useFrame(() => {
    setCameraPos({
      x: camera.position.x.toFixed(2),
      y: camera.position.y.toFixed(2),
      z: camera.position.z.toFixed(2),
    });
  });

  return (
    <group>
      <Model url={model} />
      <Html>
        <div className="absolute top-40 left-0 w-[200px] h-[100px] flex justify-center items-center bg-black opacity-50 text-white ">
          Hello world
        </div>
        <div className="absolute top-0 left-0 w-[200px] h-[100px] flex justify-center items-center bg-white opacity-50 text-black ">
          Camera Position: X: {cameraPos.x}, Y: {cameraPos.y}, Z: {cameraPos.z}
        </div>
      </Html>
    </group>
  );
}