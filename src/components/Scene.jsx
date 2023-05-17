import React, { useEffect, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import model from "../../public/baba_yagas_hut.glb";
import * as THREE from "three";
import { useSpring } from "react-spring";
import { useStore, pages } from "../store/pos.js";

export const DEG2RAD = (degrees) => degrees * (Math.PI / 180);

function Model({ url, controlsRef }) {
  const pos = useStore((s) => s.position);
  const { scene, animations } = useGLTF(url);
  const prevZoomVal = useRef(0);
  const { camera, gl } = useThree();
  scene.traverse((node) => {
    if (node.isMesh) {
      node.castShadow = true;
    }
  });

  React.useEffect(() => {
    controlsRef.current?.setTarget(
      pos.coords[0],
      pos.coords[1],
      pos.coords[2],
      true
    );
    controlsRef.current?.setLookAt(
      pos.lookAt[0],
      pos.lookAt[1],
      pos.lookAt[2],
      pos.coords[0],
      pos.coords[1],
      pos.coords[2],
      true
    );
    controlsRef.current.dolly(pos.zoom, true);
  }, [pos]);

  useEffect(() => {
    controlsRef.current.dolly(5, true);
    prevZoomVal.current = camera.zoom;
  }, [camera.zoom]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // console.clear();
      // console.log(controlsRef.current._camera.position);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

export default function Scene({ controlsRef }) {
  return (
    <group>
      <Html>
        <div className={"fixed -ml-[10px] outline-none"}>
          <Button onClick={() => alert("oke")}>1</Button>
        </div>
        <div className={"sticky left-1/2 outline-none"}>
          <Button onClick={() => alert("oke")}>2</Button>
        </div>
        <div className={"sticky left-1/2 outline-none"}>
          <Button onClick={() => alert("oke")}>3</Button>
        </div>
        <div className={"sticky left-1/2 outline-none"}>
          <Button onClick={() => alert("oke")}>4</Button>
        </div>
      </Html>
      <Model url={model} controlsRef={controlsRef} />
    </group>
  );
}

const Button = ({ children, onClick }) => {
  return (
    <button
      style={{ outline: "none" }}
      className={`rounded-full bg-black text-white h-5 w-5 flex items-center justify-center m-0 p-0
     outline-none
        `}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
