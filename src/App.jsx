import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, CameraControls } from "@react-three/drei";
import Scene from "./components/Scene";
import Menu from "./components/Menu.jsx";
import { pages, useStore } from "./store/pos";

let pageNum = 0;
let lastPage = Object.keys(pages).length;

export default function App() {
  const changePos = useStore((s) => s.changePosition);
  const page = useStore((s) => s.position);
  const controlsRef = useRef(null);

  const changeRoute = () => {
    if (pageNum >= lastPage) pageNum = 0;
    changePos(pages[Object.keys(pages)[pageNum]]);
    pageNum++;
  };

  return (
    <div className="w-screen h-screen relative">
      <Canvas shadows>
        <Suspense fallback={null}>
          <Environment preset="dawn" background />
          <Scene controlsRef={controlsRef} />
        </Suspense>
        <CameraControls enabled ref={controlsRef} maxDistance={25} />
      </Canvas>
      <div
        className={`
                  fixed top-1/2 ml-3 flex-col  -translate-y-[50%] 
                  z-10 
                  flex items-center justify-center
                  bg-white opacity-80  w-fit max-w-[270px] h-fit           
        `}
      >
        <Menu page={page.name} />
        <button onClick={changeRoute}>next</button>
      </div>
    </div>
  );
}
