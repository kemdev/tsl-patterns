/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import * as THREE from "three/webgpu";
export interface InfiniteGridProps {
  /**
   * Distance between minor grid lines.
   * @default 0.5
   */
  cellSize?: number;

  /**
   * Thickness of minor grid lines.
   * @default 0.5
   */
  cellThickness?: number;

  /**
   * Color of minor grid lines.
   * @default "#6f6f6f"
   */
  cellColor?: THREE.ColorRepresentation;

  /**
   * Distance between major grid lines.
   * @default 3
   */
  sectionSize?: number;

  /**
   * Thickness of major grid lines.
   * @default 1
   */
  sectionThickness?: number;

  /**
   * Color of major grid lines.
   * @default "#9d4b4b"
   */
  sectionColor?: THREE.ColorRepresentation;

  /**
   * Distance from the camera where the grid disappears.
   * @default 30
   */
  fadeDistance?: number;

  /**
   * Strength of the fade.
   * @default 1
   */
  fadeStrength?: number;

  /**
   * Whether the grid follows the camera.
   * @default false
   */
  followCamera?: boolean;

  /**
   * Makes the grid effectively infinite by following the camera.
   * @default true
   */
  infiniteGrid?: boolean;

  /**
   * Size of the underlying plane.
   *
   * Because the grid is procedural, this can be very large.
   * @default 200
   */
  size?: number;

  /**
   * Height of the grid.
   * @default 0
   */
  height?: number;

  /**
   * Whether to render X/Z axis lines.
   * @default true
   */
  axes?: boolean;

  /**
   * X axis color.
   * @default "#ff5555"
   */
  xAxisColor?: THREE.ColorRepresentation;

  /**
   * Z axis color.
   * @default "#5555ff"
   */
  zAxisColor?: THREE.ColorRepresentation;

  /**
   * Thickness of the axes.
   * @default 1.5
   */
  axisThickness?: number;
}
