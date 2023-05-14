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
import Menu from "./components/Menu.jsx";

const pages = {
  welcome: { name: "welcome", coords: [-8.1148, 1.6744, -4.9318] },
  about: { name: "about", coords: [3.3127, 5.8648, 3.143] },
  tokenomics: { name: "tokenomics", coords: [-5.4786, 1.0019, 1.5075] },
  "Join the Voyage": { name: "Join the Voyage", coords: [-15.84, 2.8, 0.76] },
  "Connect with Us": { name: "Connect with Us", coords: [-8.6, 4.01, 4.9] },
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
      smoothAnimation(
        cameraRef.current.position,
        new Vector3(page.coords[0], page.coords[1], page.coords[2])
      );
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
          position={[...pages.welcome.coords]}
        />
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
