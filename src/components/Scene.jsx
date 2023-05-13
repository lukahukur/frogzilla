import React, { useEffect, useState, useRef } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html } from "@react-three/drei";
import model from "../../public/baba_yagas_hut.glb";
import { Vector2, Vector3, DirectionalLight, AnimationMixer } from "three";

export const deg2rad = (degrees) => degrees * (Math.PI / 180);

function Model({ url }) {
  const { scene } = useThree();
  const gltf = useLoader(GLTFLoader, url);

  gltf.scene.traverse(function (node) {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });

  scene.add(gltf.scene);

  const mixer = new AnimationMixer(gltf);
  const aminationMap = new Map();
  gltf.animations
    .filter((a) => a.name != "Tpose")
    .forEach((e) => aminationMap.set(e.name, mixer.clipAction(e)));

  return <primitive object={gltf.scene} scale="1" />;
}

export default function Scene() {
  const { camera, scene } = useThree();
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // camera.position.x = 3.8;
    // camera.position.y = 5.99;
    // camera.position.z = 2.22;
  }, []);

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
        {/*<div className="absolute top-0 left-0 w-[200px] h-[100px] flex justify-center items-center bg-white opacity-50 text-black ">*/}
        {/*  Camera Position: X: {cameraPos.x}, Y: {cameraPos.y}, Z: {cameraPos.z}*/}
        {/*</div>*/}
      </Html>
    </group>
  );
}
