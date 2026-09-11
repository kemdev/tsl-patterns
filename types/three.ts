/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { ThreeElement } from '@react-three/fiber';
import { MeshStandardNodeMaterial, MeshBasicNodeMaterial } from 'three/webgpu';

declare module "@react-three/fiber" {
  interface ThreeElements {
    meshStandardNodeMaterial: ThreeElement<typeof MeshStandardNodeMaterial>;
    meshBasicNodeMaterial: ThreeElement<typeof MeshBasicNodeMaterial>;
    roundedPlaneGeometry: ThreeElement<typeof import("maath").geometry.RoundedPlaneGeometry>;
  }
}
