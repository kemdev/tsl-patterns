/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
import { patterns } from "@/util/images";
import { useTexture } from "@react-three/drei";
import {
  Mesh,
  MeshStandardMaterial,
  NodeMaterial,
  PlaneGeometry,
  Vector3,
} from "three/webgpu";

import { extend } from "@react-three/fiber";
import { geometry } from "maath";
import Parallax from "../effects/Parallax";
import Pattern from "../materials/Pattern";
import { useRef } from "react";

extend({ RoundedPlaneGeometry: geometry.RoundedPlaneGeometry });

interface Screen2Props {
  currentSelectedPatternIndex: number;
}

type PatternCardProps = {
  index: number;
  textureUrl: string;
};

export default function Screen2({ currentSelectedPatternIndex }: Screen2Props) {
  const patternRef = useRef<NodeMaterial | null>(null);
  const arrLength = patterns.length;
  const arr = Array.from({ length: arrLength }, (_, i) => i);

  const columns = 5;
  const rows = Math.ceil(arrLength / columns);

  return (
    <>
      <Pattern
        patternIndex={currentSelectedPatternIndex}
        ref={patternRef}
      />
      <mesh position={[0, 1, -2]}>
        {/* <planeGeometry args={[8, 3, 1, 1]} />
        <meshBasicMaterial color="#6b6bb4" /> */}

        <group position={[0, 0, 0.01]}>
          {arr.map((i) => (
            <Parallax
              key={i}
              position={
                new Vector3(
                  i + 0.5 - arrLength / 2, // column
                  0, // row
                  0.002,
                )
              }
              image={patterns[i].image}
            >
              {/* <ScreenImageMesh
                textureUrl={patterns[i].image}
                meshProps={{
                  // position: new Vector3(
                  //   i + 0.5 - arrLength / 2, // column
                  //   0, // row
                  //   0.002,
                  // ),
                  scale: new Vector3(0.9, 0.9, 1),
                }}
              /> */}
            </Parallax>
          ))}
        </group>
      </mesh>
    </>
  );
}

type screenImage = {
  meshProps: Partial<Mesh>;
  materialProps?: Partial<NodeMaterial>;
  geometryProps?: Partial<PlaneGeometry>;
  textureUrl: string;
};

const ScreenImageMesh = ({
  meshProps,
  materialProps,
  geometryProps,
  textureUrl,
}: screenImage) => {
  const { position, scale, ...props } = meshProps;
  const texture = useTexture(textureUrl);
  return (
    <mesh
      position={position}
      scale={scale}
      {...props}
    >
      <roundedPlaneGeometry
        {...(geometryProps as any)}
        // args={[1, 1, 1, 1]}
        args={[1, 1.61803398875, 0.1]}
      />
      <meshBasicNodeMaterial
        {...(materialProps as any)}
        map={texture}
      />
    </mesh>
  );
};
