import React, { useEffect, useState, useRef } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html, useGLTF } from "@react-three/drei";
import model from "../../public/baba_yagas_hut.glb";
import * as THREE from "three";

export const deg2rad = (degrees) => degrees * (Math.PI / 180);

function Model({ url }) {
  const { scene, animations } = useGLTF(url);
  let mixer = new THREE.AnimationMixer(scene);
  animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.play();
  });
  useFrame((state, delta) => {
    mixer.update(delta);
  });

  return <primitive object={scene} scale="1" />;
}

export default function Scene() {
  return <Model url={model} />;
}
