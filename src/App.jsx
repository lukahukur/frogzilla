import React, { Suspense, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, CameraControls } from "@react-three/drei";
import Scene from "./components/Scene";
import { pages, useStore } from "./store/pos";
import left from "./assets/caret-left-solid.svg";
import right from "./assets/caret-right-solid.svg";

let pageNum = 0;
let lastPage = Object.keys(pages).length;

export default function App() {
  const changePos = useStore((s) => s.changePosition);
  const page = useStore((s) => s.position);
  const controlsRef = useRef(null);

  useEffect(() => {
    pageNum = page.id;
  }, [page]);

  const changeRoute = () => ({
    next: () => {
      pageNum++;
      if (pageNum >= lastPage) pageNum = 0;
      changePos(pages[Object.keys(pages)[pageNum]]);
    },
    prev: () => {
      if (pageNum <= 0) pageNum = lastPage;
      pageNum--;
      changePos(pages[Object.keys(pages)[pageNum]]);
    },
  });

  return (
    <div className="w-screen h-screen relative">
      <Suspense fallback={<Fallback />}>
        <Canvas shadows>
          <Environment preset="dawn" background />
          <Scene
            controlsRef={controlsRef}
            changePos={changePos}
            currentPage={page.name}
          />

          <CameraControls
            enabled
            ref={controlsRef}
            maxDistance={6}
            maxPolarAngle={1.65}
          />
        </Canvas>
      </Suspense>
      <div
        className={`
                  fixed top-[95%] left-1/2 ml-3 flex-col  -translate-y-[50%]  -translate-x-[50%] 
                  z-[100] min-w-[250px] rounded-full text-white
                  bg-black opacity-80  w-fit h-fit text-sm   select-none
        `}
      >
        <div className={"flex w-full justify-between items-center px-2 py-1"}>
          <button
            onClick={changeRoute().prev}
            className={"min-w-[20px] h-[20px] flex items-center justify-start"}
          >
            <img src={left} alt={"left"} width={"7"} />
          </button>
          <div>{page.name ? page.name : "Get started"}</div>
          <button
            className={"min-w-[20px] h-[20px] flex items-center justify-end"}
            onClick={changeRoute().next}
          >
            <img src={right} alt={"right"} width={"7"} />
          </button>
        </div>
      </div>
    </div>
  );
}

const Fallback = () => {
  return (
    <div className={"w-full h-screen flex items-center justify-center"}>
      HEEy
    </div>
  );
};
