import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Vector3, DirectionalLight } from "three";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  OrthographicCamera,
} from "@react-three/drei";
import Scene, { deg2rad } from "./components/Scene";
import TWEEN from "@tweenjs/tween.js";

const pages = {
  welcome: [-1.21, 1.28, -4.36],
  about: [3.8, 5.99, 2.22],
  tokenomics: [-4.47, 0.77, 1.23],
  "Join the Voyage": [-9.74, 3.41, 2.76],
  // "Connect with Us": "Connect with Us",
};

let pageNum = 1;
let lastPage = Object.keys(pages).length;

const DURATION = 1000;

const smoothAnimation = (position, endPosition) => {
  const easing = TWEEN.Easing.Quadratic.InOut;

  const tween = new TWEEN.Tween(position)
    .to(endPosition, DURATION)
    .easing(easing);

  tween.start();
};

export default function App() {
  const [cameraPos, setCameraPos] = useState({ x: 0, y: 0, z: 0 });

  const cameraRef = useRef();
  const [page, setPage] = useState(pages["welcome"]);

  useEffect(() => {
    let t = setTimeout(() => {
      smoothAnimation(cameraRef.current.position, new Vector3(...page));
    });
    return () => clearTimeout(t);
  }, [page]);

  const changeRoute = () => {
    if (pageNum >= lastPage) pageNum = 0;
    setPage(pages[Object.keys(pages)[pageNum]]);
    pageNum++;
  };

  useEffect(() => {
    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
    };
    animate();
  }, []);

  return (
    <div className="w-screen h-screen relative">
      <Canvas>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          fov={70}
          position={[-1.21, 1.28, -4.36]}
        />
        {/*<directionalLight*/}
        {/*  intensity={0.5}*/}
        {/*  color={"orange"}*/}
        {/*  castShadow // highlight-line*/}
        {/*  isLight*/}
        {/*  shadow-mapSize-height={512}*/}
        {/*  shadow-mapSize-width={512}*/}
        {/*/>*/}

        <Suspense fallback={null}>
          <Environment preset="dawn" background />
          <Scene receiveShadow />
        </Suspense>
        <OrbitControls
          minDistance={1} // minimum distance (in world units) from the target
          maxDistance={100} // maximum distance (in world units) from the target
          maxPolarAngle={deg2rad(80)}
          minPolarAngle={deg2rad(30)}
          enablePan={true}
          enableRotate={true}
        />
      </Canvas>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-10 flex items-center justify-center
                  bg-white opacity-80  w-[200px] h-[100px]            
        `}
      >
        <button onClick={changeRoute}>
          hey
          {/*{showHelloWorld2 ? "Hello world 2" : "Hello world"}*/}
        </button>
      </div>
    </div>
  );
}
