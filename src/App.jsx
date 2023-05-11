import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import Scene from "./components/Scene";
import TWEEN from "@tweenjs/tween.js";

export default function App() {
  const cameraRef = useRef();
  const [showHelloWorld2, setShowHelloWorld2] = useState(false);
  const DURATION = 1000;

  const handleHelloWorld2Click = () => {
    if (showHelloWorld2) {
      const targetPosition = new Vector3(
        -5.2956657823170303,
        2.931572680090176,
        3.7056299030550495
      );

      const easing = TWEEN.Easing.Quadratic.InOut;

      const tween = new TWEEN.Tween(cameraRef.current.position)
        .to(targetPosition, DURATION)
        .easing(easing)
        .onUpdate(() => {
          cameraRef.current.lookAt(0, 0, 0);
        });

      tween.start();
      cameraRef.current.rotation.set(0, 0, 0);
    } else {
      const targetPosition = new Vector3(
        -4.4715597108145526,
        0.7726918437760153,
        -1.232442542015795
      );

      const easing = TWEEN.Easing.Quadratic.InOut;
      const tween = new TWEEN.Tween(cameraRef.current.position)
        .to(targetPosition, DURATION)
        .easing(easing)
        .onUpdate(() => {
          cameraRef.current.lookAt(0, 0, 0);
        });
      tween.start();
      cameraRef.current.rotation.set(0, Math.PI, 0);
    }

    setShowHelloWorld2((e) => !e);
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
          position={[
            -3.4715597108145526, 0.7726918437760153, -1.232442542015795,
          ]}
        />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 10, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Environment preset="sunset" background />
          <Scene />
        </Suspense>

        <OrbitControls />
      </Canvas>
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] z-10 flex items-center justify-center
                  bg-white opacity-80  w-[200px] h-[100px]            
        `}
      >
        <button onClick={handleHelloWorld2Click}>
          {showHelloWorld2 ? "Hello world 2" : "Hello world"}
        </button>
      </div>
    </div>
  );
}
