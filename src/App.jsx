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

export default function App() {
  const cameraRef = useRef();
  const [showHelloWorld2, setShowHelloWorld2] = useState(false);

  const DURATION = 1000;

  const handleHelloWorld2Click = () => {
    if (showHelloWorld2) {
      const targetPosition = new Vector3(
        -5.2956657823170303,
        2.931572680090176,
        1
      );

      const easing = TWEEN.Easing.Quadratic.InOut;

      const tween = new TWEEN.Tween(cameraRef.current.position)
        .to(targetPosition, DURATION)
        .easing(easing)
        .onUpdate(() => {
          cameraRef.current.rotation.set(
            deg2rad(20),
            deg2rad(-100),
            deg2rad(0)
          );
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
          fov={70}
          position={[-5.2956657823170303, 2.931572680090176, 1]}
        />
        <ambientLight intensity={0.2} />
        <directionalLight
          intensity={0.5}
          castShadow // highlight-line
          isLight
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
        />
        <pointLight position={[10, 10, 10]} />
        <directionalLight position={[0, 10, 5]} intensity={0.2} />

        <Suspense fallback={null}>
          <Environment preset="night" background />
          <Scene receiveShadow />
        </Suspense>

        <OrbitControls
          minAzimuthAngle={deg2rad(180)}
          maxAzimuthAngle={deg2rad(-60)}
          maxPolarAngle={deg2rad(80)}
          minPolarAngle={deg2rad(30)}
          enablePan={false}
          enableRotate
        />
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
