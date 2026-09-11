/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";

import * as THREE from "three/webgpu";
import {
  abs,
  cameraPosition,
  color,
  float,
  fract,
  fwidth,
  max,
  min,
  mix,
  positionWorld,
  smoothstep,
  vec2,
} from "three/tsl";
import { MeshBasicNodeMaterial } from "three/webgpu";
import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";

export interface InfiniteGridProps {
  /** Distance between minor grid lines. */
  cellSize?: number;

  /**
   * Minor line thickness.
   *
   * 1 = approximately one cell width.
   * 0.5 = half a cell width.
   */
  cellThickness?: number;

  /** Minor grid color. */
  cellColor?: THREE.ColorRepresentation;

  /** Distance between major grid lines. */
  sectionSize?: number;

  /** Major line thickness. */
  sectionThickness?: number;

  /** Major grid color. */
  sectionColor?: THREE.ColorRepresentation;

  /** Distance at which the grid completely fades. */
  fadeDistance?: number;

  /**
   * Fade strength.
   *
   * 0 = almost no fade.
   * 1 = normal fade.
   * >1 = stronger fade.
   */
  fadeStrength?: number;

  /**
   * Move the grid with the camera.
   *
   * Useful for a large/infinite-looking floor.
   */
  followCamera?: boolean;

  /**
   * Alias for enabling camera-following behavior.
   */
  infiniteGrid?: boolean;

  /** Size of the underlying plane. */
  size?: number;

  /** Y position of the floor. */
  height?: number;

  /** Show X/Z axes. */
  axes?: boolean;

  /** X-axis color. */
  xAxisColor?: THREE.ColorRepresentation;

  /** Z-axis color. */
  zAxisColor?: THREE.ColorRepresentation;

  /** Axis thickness. */
  axisThickness?: number;
}

export function InfiniteGridV2({
  cellSize = 0.5,
  cellThickness = 0.5,
  cellColor = "#6f6f6f",

  sectionSize = 3,
  sectionThickness = 1,
  sectionColor = "#9d4b4b",

  fadeDistance = 30,
  fadeStrength = 1,

  followCamera = false,
  infiniteGrid = true,

  size = 200,
  height = 0,

  axes = true,
  xAxisColor = "#ff5555",
  zAxisColor = "#5555ff",
  axisThickness = 1.5,
}: InfiniteGridProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const { camera } = useThree();

  /*
   * ---------------------------------------------------------
   * MATERIAL
   * ---------------------------------------------------------
   *
   * Everything that depends on the camera or fragment position
   * stays inside TSL.
   *
   * This is important for WebGPU.
   */
  const material = useMemo(() => {
    /*
     * -------------------------------------------------------
     * WORLD COORDINATES
     * -------------------------------------------------------
     */

    const worldXZ = vec2(positionWorld.x, positionWorld.z);

    /*
     * -------------------------------------------------------
     * MINOR GRID
     * -------------------------------------------------------
     */

    const cell = float(Math.max(cellSize, 0.0001));

    /*
     * Convert world position to grid coordinates.
     *
     * Example:
     *
     * world = 2.37
     * cell  = 0.5
     *
     * grid coordinate = 4.74
     */
    const cellCoord = worldXZ.div(cell);

    /*
     * Fractional position inside a cell.
     *
     * 0.0 ---------------- 1.0
     */
    const cellFract = fract(cellCoord);

    /*
     * Distance to the closest grid line.
     *
     *       line
     *        ↓
     *
     * 0 ----|---------- 1
     *       ↑
     *     distance
     */
    const cellDistance = min(cellFract, float(1).sub(cellFract));

    /*
     * -------------------------------------------------------
     * SCREEN-SPACE ANTI-ALIASING
     * -------------------------------------------------------
     *
     * fwidth() tells us how much a value changes over one
     * screen pixel.
     *
     * Therefore the AA width automatically becomes larger
     * when the grid is viewed at a steep angle / far away.
     *
     * This is the key difference from v1.
     */
    const cellAA = fwidth(cellDistance);

    /*
     * User thickness converted into grid-coordinate space.
     *
     * cellThickness = 0.5 means approximately half of a cell.
     */
    const cellWidth = float(cellThickness).mul(0.5);

    /*
     * Smooth line coverage.
     *
     * The AA region is based on fwidth(), not a fixed value.
     */
    const cellLineX = float(1).sub(
      smoothstep(cellWidth, cellWidth.add(cellAA.x), cellDistance.x),
    );

    const cellLineZ = float(1).sub(
      smoothstep(cellWidth, cellWidth.add(cellAA.y), cellDistance.y),
    );

    const minorGrid = max(cellLineX, cellLineZ);

    /*
     * -------------------------------------------------------
     * MAJOR / SECTION GRID
     * -------------------------------------------------------
     */

    const section = float(Math.max(sectionSize, 0.0001));

    const sectionCoord = worldXZ.div(section);

    const sectionFract = fract(sectionCoord);

    const sectionDistance = min(sectionFract, float(1).sub(sectionFract));

    /*
     * Derivatives are calculated separately because the
     * section grid has a different world-space scale.
     */
    const sectionAA = fwidth(sectionDistance);

    const sectionWidth = float(sectionThickness).mul(0.5);

    const sectionLineX = float(1).sub(
      smoothstep(
        sectionWidth,
        sectionWidth.add(sectionAA.x),
        sectionDistance.x,
      ),
    );

    const sectionLineZ = float(1).sub(
      smoothstep(
        sectionWidth,
        sectionWidth.add(sectionAA.y),
        sectionDistance.y,
      ),
    );

    const majorGrid = max(sectionLineX, sectionLineZ);

    /*
     * -------------------------------------------------------
     * AXES
     * -------------------------------------------------------
     *
     * X axis lies on Z = 0.
     *
     * Z axis lies on X = 0.
     */

    const axisXDistance = abs(positionWorld.z);
    const axisZDistance = abs(positionWorld.x);

    /*
     * Derivative-based AA for axes.
     */
    const axisXAA = fwidth(axisXDistance);
    const axisZAA = fwidth(axisZDistance);

    /*
     * Convert axis thickness into world-space units.
     *
     * axisThickness is relative to cellSize.
     */
    const axisWidth = float(Math.max(cellSize, 0.0001))
      .mul(axisThickness)
      .mul(0.02);

    const xAxis = float(1).sub(
      smoothstep(axisWidth, axisWidth.add(axisXAA), axisXDistance),
    );

    const zAxis = float(1).sub(
      smoothstep(axisWidth, axisWidth.add(axisZAA), axisZDistance),
    );

    /*
     * -------------------------------------------------------
     * COLORS
     * -------------------------------------------------------
     */

    const minorColor = color(new THREE.Color(cellColor));
    const majorColor = color(new THREE.Color(sectionColor));

    const xColor = color(new THREE.Color(xAxisColor));
    const zColor = color(new THREE.Color(zAxisColor));

    /*
     * Major grid overrides minor grid.
     */
    const gridColor = mix(minorColor, majorColor, majorGrid);

    /*
     * Axes override normal grid lines.
     */
    const axisXColorMix = mix(gridColor, xColor, xAxis);

    const finalColor = mix(axisXColorMix, zColor, zAxis);

    /*
     * -------------------------------------------------------
     * LINE COVERAGE
     * -------------------------------------------------------
     */

    const gridCoverage = max(minorGrid, majorGrid);

    const axisCoverage = max(xAxis, zAxis);

    const lineCoverage = max(gridCoverage, axisCoverage);

    /*
     * -------------------------------------------------------
     * DISTANCE FADE
     * -------------------------------------------------------
     *
     * Use the actual GPU camera position.
     *
     * This means the material automatically reacts to camera
     * movement without rebuilding the node graph.
     */
    const cameraXZ = vec2(cameraPosition.x, cameraPosition.z);

    const distance = worldXZ.distance(cameraXZ);

    /*
     * Start fading at 50% of fadeDistance.
     */
    const fadeStart = float(fadeDistance).mul(0.5);

    const fadeEnd = float(Math.max(fadeDistance, 0.0001));

    const fade = float(1).sub(smoothstep(fadeStart, fadeEnd, distance));

    /*
     * Apply user-controlled fade strength.
     */
    const finalFade = fade.pow(float(Math.max(fadeStrength, 0.0001)));

    /*
     * -------------------------------------------------------
     * MATERIAL
     * -------------------------------------------------------
     */

    const mat = new MeshBasicNodeMaterial();

    mat.colorNode = finalColor;

    /*
     * Alpha contains:
     *
     * 1. line coverage
     * 2. distance fade
     */
    mat.opacityNode = lineCoverage.mul(finalFade);

    mat.transparent = true;

    /*
     * Grid is drawn on top without writing depth.
     */
    mat.depthWrite = false;

    /*
     * Grid has no lighting.
     */
    mat.toneMapped = false;

    /*
     * Render both sides because this is a floor plane.
     */
    // mat.side = THREE.DoubleSide;

    return mat;
  }, [cellSize, cellThickness, cellColor, sectionSize, sectionThickness, sectionColor, fadeDistance, fadeStrength, xAxisColor, zAxisColor, axisThickness]);

  /*
   * ---------------------------------------------------------
   * CAMERA FOLLOW
   * ---------------------------------------------------------
   *
   * We move the finite plane with the camera.
   *
   * Because the grid pattern itself uses WORLD coordinates,
   * the texture/grid does NOT move with the plane.
   *
   * This gives us an effectively infinite grid without
   * requiring an enormous geometry.
   */
  useFrame(() => {
    if (!meshRef.current) return;

    if (followCamera || infiniteGrid) {
      meshRef.current.position.x = camera.position.x;

      meshRef.current.position.z = camera.position.z;
    }
  });

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  const followsCamera = followCamera || infiniteGrid;

  return (
    <mesh
      ref={meshRef}
      position={[
        followsCamera ? camera.position.x : 0,
        height,
        followsCamera ? camera.position.z : 0,
      ]}
      rotation={[-Math.PI / 2, 0, 0]}
      frustumCulled={false}
    >
      <planeGeometry args={[size, size]}  />

      <primitive
        object={material}
        attach="material"
      />
    </mesh>
  );
}

export default InfiniteGridV2;
