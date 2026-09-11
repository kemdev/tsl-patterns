/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

// import { AccumulativeShadows, RandomizedLight } from "@react-three/drei";

// export default function Shadows() {
//   return (
//     <AccumulativeShadows
//       temporal
//       frames={100}
//       color="#9d4b4b"
//       colorBlend={0.5}
//       alphaTest={0.9}
//       scale={20}
//     >
//       <RandomizedLight
//         amount={8}
//         radius={4}
//         position={[5, 5, -10]}
//       />
//     </AccumulativeShadows>
//   );
// }
// import * as THREE from "three/webgpu";

export default function Shadows() {
  return (
    <mesh
      // rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.01, 0]}
      receiveShadow
    >
      <planeGeometry args={[20, 20]} />
      {/* WebGPURenderer natively converts standard shadowMaterial logic */}
      <shadowMaterial
        transparent
        opacity={0.5}
        color="#9d4b4b"
      />
    </mesh>
  );
}