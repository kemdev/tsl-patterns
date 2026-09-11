/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import React, { useState } from "react";
import { patterns } from "@/util/images";
import { Float, Html } from "@react-three/drei";
import Image from "next/image";
import * as THREE from "three/webgpu";
import { color } from "three/tsl";
// type Props = object;

export default function Screen() {
  const DoubleSide = THREE.DoubleSide;
  const [hidden, setHidden] = useState();
  return (
    <>
      <mesh position={[0, 2, -10]}>
        <planeGeometry args={[8, 3, 1, 1]} />
        <meshBasicMaterial color="#303035" />
        <Float
          floatIntensity={1}
          rotationIntensity={0.5}
        >
          <Html
            // position={[0, 2, -2]}
            position={[0, 0, 0.01]}
            center
            transform
            distanceFactor={8}
            occlude
            material={
              <meshPhysicalMaterial
                side={DoubleSide} // Required
                opacity={0.1} // Degree of influence of lighting on the HTML
                colorNode={color("crimson")}
              />
            }
            className="w-1/2"
            // style={{
            //   transition: "all 0.5s",
            //   opacity: hidden ? 0 : 1,
            //   transform: `scale(${hidden ? 0.5 : 1})`,
            // }}
            scale={0.5}
          >
            <div className="flex gap-4 flex-wrap pointer-none">
              {patterns.map((pattern) => (
                <div
                  key={pattern.id}
                  className="relative overflow-hidden rounded-lg select-none"
                >
                  <Image
                    src={pattern.image}
                    alt={`Pattern ${pattern.id}`}
                    className="h-40 w-40 object-cover select-none pointer-none"
                    width={160}
                    height={160}
                    loading="eager"
                  />

                  <div className="absolute left-2 top-2 flex gap-1">
                    {pattern.features?.map((feature) => (
                      <span
                        key={feature}
                        className="rounded bg-black/70 px-2 py-1 text-xs text-white"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Html>
        </Float>
      </mesh>
    </>
  );
}
