import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Html } from "@react-three/drei";
import model from "../../public/baba_yagas_hut.glb";
import * as THREE from "three";
import { useSpring } from "react-spring";
import { useStore, pages } from "../store/pos.js";

export const DEG2RAD = (degrees) => degrees * (Math.PI / 180);
const pageNames = Object.keys(pages);
function Model({ url, controlsRef }) {
  const pos = useStore((s) => s.position);
  const { scene, animations } = useGLTF(url);

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

  React.useEffect(() => {
    controlsRef.current.dolly(1, true);
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

export default function Scene({ controlsRef, changePos, currentPage }) {
  return (
    <group>
      {pageNames.map((e, i) => {
        return (
          <Html
            className={"sm:flex block"}
            key={i}
            position={[
              pages[e].coords[0],
              pages[e].coords[1],
              pages[e].coords[2],
            ]}
          >
            <div className={"outline-none w-fit"}>
              <Button onClick={() => changePos(pages[Object.keys(pages)[i]])}>
                {i + 1}
              </Button>
            </div>

            <section
              style={{
                display: currentPage === pages[e].name ? "grid" : "none",
              }}
              className={`bg-black text-white max-w-[220px] sm:w-[220px] w-[170px]  pt-1 pb-2 px-2 rounded-lg bg-opacity-90
                 [&>p]:text-xs grid-rows-1 gap-[2px] sm:ml-2 sm:mt-0 mt-2
                `}
            >
              <h2>{pages[e].name}</h2>
              <p>{pages[e].text}</p>
            </section>
          </Html>
        );
      })}

      <Model url={model} controlsRef={controlsRef} />
    </group>
  );
}

const Button = ({ children, onClick }) => {
  return (
    <button
      style={{ outline: "none" }}
      className={`
     rounded-full bg-black bg-opacity-80 text-white h-5 w-5 flex items-center justify-center m-0 p-0
     outline-none border-2 p-[10px] border-neutral-400 text-xs
     
        `}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};
