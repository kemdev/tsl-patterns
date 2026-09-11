/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { OrbitControls, Sky } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three/webgpu";

import { button, useControls } from "leva";
import { useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

import Floor from "./Floor";

extend(THREE as any);

const INITIAL_CAMERA_POSITION = new THREE.Vector3(0, 1.4, 6.8);
const INITIAL_TARGET = new THREE.Vector3(0, 1, 0);

export default function Scene({ children }: { children?: React.ReactNode }) {
  const { camera } = useThree();
  const [isCameraResetting, setIsCameraResetting] = useState(false);
  const [isDisabled, setDisabled] = useState(true);
  const controlsRef = useRef<OrbitControlsImpl | null>(null);


  // const  reset = useControls("Camera", {
  //   reset: button(() => {
  //     setIsCameraResetting(true);
  //   }, {
  //     disabled: isDisabled,
  //   }
  // ),
  // });

  useControls(
    () => ({
      reset: button(
        () => {
          setIsCameraResetting(true);
          setDisabled(true);
        },
        {
          disabled: isDisabled,
        },
      ),
    }),
    [isDisabled],
  );

  useFrame((_, delta) => {
    const controls = controlsRef.current;

    if (!isCameraResetting || !controls) return;

    const t = 1 - Math.exp(-5 * delta);

    camera.position.lerp(INITIAL_CAMERA_POSITION, t);
    controls.target.lerp(INITIAL_TARGET, t);

    controls.update();

    const cameraFinished =
      camera.position.distanceTo(INITIAL_CAMERA_POSITION) < 0.01;

    const targetFinished = controls.target.distanceTo(INITIAL_TARGET) < 0.01;

    if (cameraFinished && targetFinished) {
      camera.position.copy(INITIAL_CAMERA_POSITION);
      controls.target.copy(INITIAL_TARGET);

      controls.update();

      setIsCameraResetting(false);
    }
  });

  return (
    <group position-y={-0.5}>
      <OrbitControls
        makeDefault
        ref={controlsRef}
        target={[0, 1, 0]}
        enableDamping
        maxPolarAngle={Math.PI / 2}
        // enableZoom={false}
        onStart={() => {
          // setDisabled(false);
          setIsCameraResetting(false);
          setDisabled(false);
        }}
      />

      <Floor />

      {children}
    </group>
  );
}
