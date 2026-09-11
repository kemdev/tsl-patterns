/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

/**
 * This implementation is from chatGPT check chat in link https://chatgpt.com/share/6a9d5df9-6a70-83eb-90e3-e67f51b56bf9
 */
"use client";

import { InfiniteGridProps } from "@/types/InfiniteGrid";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import {
  abs,
  color,
  float,
  fract,
  max,
  min,
  mix,
  positionWorld,
  smoothstep,
  vec2,
} from "three/tsl";
import * as THREE from "three/webgpu";
import { MeshBasicNodeMaterial } from "three/webgpu";

export function InfiniteGridV1({
  cellSize = 0.5,
  cellThickness = 0.5,
  cellColor = 0x6f6f6f,

  sectionSize = 3,
  sectionThickness = 0.2,
  sectionColor = 0x9d4b4b,

  fadeDistance = 30,
  fadeStrength = 1,

  followCamera = false,
  infiniteGrid = true,

  size = 200,
  height = 0,

  xAxisColor = 0xff5555,
  zAxisColor = 0x5555ff,
  axisThickness = 1.5,
}: InfiniteGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();

  const material = useMemo(() => {
    /*
     * ---------------------------------------------------------
     * WORLD POSITION
     * ---------------------------------------------------------
     *
     * positionWorld gives us the final world-space position
     * of each fragment/vertex through TSL.
     */
    const worldXZ = vec2(positionWorld.x, positionWorld.z);

    /*
     * ---------------------------------------------------------
     * MINOR GRID
     * ---------------------------------------------------------
     */

    const cell = float(cellSize);

    const cellCoord = worldXZ.div(cell);

    /*
     * Distance to the nearest grid line.
     *
     * Example:
     *
     * coordinate = 1.02
     *
     * fract(1.02) = 0.02
     *
     * distance to line = 0.02
     */
    const cellFract = fract(cellCoord);

    const cellDistance = min(cellFract, float(1).sub(cellFract));

    /*
     * Convert the distance to a line.
     *
     * cellThickness is interpreted as a percentage
     * of the cell size.
     */
    const cellWidth = float(cellThickness).mul(0.05);

    const cellLineX = float(1).sub(
      smoothstep(float(0), cellWidth, cellDistance.x),
    );

    const cellLineZ = float(1).sub(
      smoothstep(float(0), cellWidth, cellDistance.y),
    );

    const minorGrid = max(cellLineX, cellLineZ);

    /*
     * ---------------------------------------------------------
     * MAJOR / SECTION GRID
     * ---------------------------------------------------------
     */

    const section = float(sectionSize);

    const sectionCoord = worldXZ.div(section);

    const sectionFract = fract(sectionCoord);

    const sectionDistance = min(sectionFract, float(1).sub(sectionFract));

    const sectionWidth = float(sectionThickness).mul(0.05);

    const sectionLineX = float(1).sub(
      smoothstep(float(0), sectionWidth, sectionDistance.x),
    );

    const sectionLineZ = float(1).sub(
      smoothstep(float(0), sectionWidth, sectionDistance.y),
    );

    const majorGrid = max(sectionLineX, sectionLineZ);

    /*
     * ---------------------------------------------------------
     * AXES
     * ---------------------------------------------------------
     *
     * X axis = Z coordinate near zero
     * Z axis = X coordinate near zero
     */

    const axisWidth = float(axisThickness).mul(0.025);

    const xAxis = float(1).sub(
      smoothstep(float(0), axisWidth, abs(positionWorld.z)),
    );

    const zAxis = float(1).sub(
      smoothstep(float(0), axisWidth, abs(positionWorld.x)),
    );

    /*
     * ---------------------------------------------------------
     * COLORS
     * ---------------------------------------------------------
     */

    const minorColor = color(new THREE.Color(cellColor));
    const majorColor = color(new THREE.Color(sectionColor));

    const xColor = color(new THREE.Color(xAxisColor));
    const zColor = color(new THREE.Color(zAxisColor));

    /*
     * Minor grid first.
     *
     * Then major grid overrides it.
     */
    const gridColor = mix(minorColor, majorColor, majorGrid);

    /*
     * Axis colors override grid colors.
     */
    const axisColor = mix(gridColor, xColor, xAxis);

    const finalColor = mix(axisColor, zColor, zAxis);

    /*
     * ---------------------------------------------------------
     * DISTANCE FADE
     * ---------------------------------------------------------
     */

    /*
     * Distance from camera to current world position.
     */
    const cameraXZ = vec2(camera.position.x, camera.position.z);

    const distance = worldXZ.distance(cameraXZ);

    /*
     * Start fading at roughly 50% of fadeDistance.
     */
    const fadeStart = float(fadeDistance).mul(0.5);

    const fade = float(1).sub(
      smoothstep(fadeStart, float(fadeDistance), distance),
    );

    /*
     * fadeStrength controls how aggressively
     * the grid disappears.
     */
    const finalFade = fade.pow(float(fadeStrength));

    /*
     * Combine all line types.
     */
    const lineStrength = max(minorGrid, majorGrid);

    /*
     * Axes should also participate in fading.
     */
    const axisStrength = max(xAxis, zAxis);

    const finalStrength = max(lineStrength, axisStrength);

    /*
     * ---------------------------------------------------------
     * MATERIAL
     * ---------------------------------------------------------
     */

    const mat = new MeshBasicNodeMaterial();

    mat.colorNode = finalColor;

    /*
     * Make the grid transparent based on distance
     * and line strength.
     */
    mat.opacityNode = finalStrength.mul(finalFade);

    mat.transparent = true;

    /*
     * We don't need lighting for a grid.
     */
    mat.depthWrite = false;

    /*
     * Prevent the grid from being affected by tone mapping.
     */
    mat.toneMapped = false;

    return mat;
  }, [
    cellSize,
    cellThickness,
    cellColor,
    sectionSize,
    sectionThickness,
    sectionColor,
    fadeDistance,
    fadeStrength,
    xAxisColor,
    zAxisColor,
    axisThickness,
    camera,
  ]);

  /*
   * ---------------------------------------------------------
   * FOLLOW CAMERA
   * ---------------------------------------------------------
   *
   * Moving the plane with the camera gives the impression
   * that the grid is infinite.
   */
  useFrame(() => {
    if (!meshRef.current) return;

    if (followCamera || infiniteGrid) {
      meshRef.current.position.x = camera.position.x;
      meshRef.current.position.z = camera.position.z;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[
        followCamera || infiniteGrid ? camera.position.x : 0,
        height,
        followCamera || infiniteGrid ? camera.position.z : 0,
      ]}
      rotation={[-Math.PI / 2, 0, 0]}
      frustumCulled={false}
    >
      <planeGeometry args={[size, size]} />

      <primitive
        object={material}
        attach="material"
      />
    </mesh>
  );
}

export default InfiniteGridV1;
