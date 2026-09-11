/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

// "use client";
// import useSelectedPatternStore from "@/stores/selectedPattern";
// import { Canvas } from "@react-three/fiber";
// import { useControls } from "leva";
// import { useEffect, useRef } from "react";
// import * as THREE from "three/webgpu";
// import Pattern from "./materials/Pattern";
// import Scene from "./Scene";

// export default function Experience() {
//   const patternRef = useRef<THREE.NodeMaterial | null>(null);

//   const { setSelectedPattern, selectedPattern } = useSelectedPatternStore();

//   const arr = Array.from({ length: 10 }, (_, i) => i + 1);

//   const [{ pattern }, set] = useControls("Choose a Pattern", () => ({
//     pattern: {
//       label: "Pattern",
//       value: selectedPattern,
//       options: arr,
//       onChange: (value: number) => setSelectedPattern(value),
//       transient: false,
//     },
//   }));

//   useEffect(() => {
//     return set({ pattern: selectedPattern });
//   }, [selectedPattern, set]);

//   return (
//     <Canvas
//       shadows="percentage"
//       dpr={[1, 2]}
//       camera={{
//         position: [0, 1.4, 6.8],
//         fov: 35,
//         isPerspectiveCamera: true,
//         near: 0.1,
//         far: 100,
//       }}
//       gl={async (props) => {
//         // To remove the warning!
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//         const { powerPreference: _powerPreference, ...rendererProps } = props;

//         const renderer = new THREE.WebGPURenderer({
//           ...rendererProps,
//           canvas: props.canvas as HTMLCanvasElement,
//           antialias: true,
//           forceWebGL: false,
//         });

//         await renderer.init();

//         return renderer;
//       }}
//     >
//       <Scene>
//         {/* <Pattern
//           patternIndex={pattern}
//           ref={patternRef}
//         /> */}

//         <Pattern
//           config={patternConfig}
//           ref={patternRef}
//         />
//       </Scene>
//     </Canvas>
//   );
// }

"use client";

import usePatternControls from "@/hooks/usePatternControls";

import useSelectedPatternStore from "@/stores/selectedPattern";

import { isPatternId, patternRegistry } from "@/tsl/index";

import { Canvas } from "@react-three/fiber";

import { useControls } from "leva";

import { useEffect, useMemo, useRef } from "react";

import * as THREE from "three/webgpu";

import Pattern from "./materials/Pattern";
import Scene from "./Scene";
import PatternValues from "../ui/PatternValues";

export default function Experience() {
  const patternRef = useRef<THREE.NodeMaterial | null>(null);

  const { selectedPattern, setSelectedPattern } = useSelectedPatternStore();

  /**
   * --------------------------------
   * Validate selected pattern
   * --------------------------------
   */

  const patternId = isPatternId(selectedPattern) ? selectedPattern : 1;

  /**
   * --------------------------------
   * Generate selector from registry
   * --------------------------------
   */

  const patternOptions = useMemo(
    () =>
      Object.fromEntries(
        Object.values(patternRegistry).map((pattern) => [
          `${pattern.id} · ${pattern.name}`,

          pattern.id,
        ]),
      ),
    [],
  );

  /**
   * --------------------------------
   * Pattern selector
   * --------------------------------
   */

  const [, setPatternControl] = useControls(
    "Choose a Pattern",

    () => ({
      pattern: {
        label: "Pattern",

        value: patternId,

        options: patternOptions,

        onChange: (value: number) => {
          if (isPatternId(value)) {
            setSelectedPattern(value);
          }
        },

        transient: false,
      },
    }),
  );

  /**
   * Keep Zustand -> Leva synchronized
   */
  useEffect(() => {
    setPatternControl({
      pattern: patternId,
    });
  }, [patternId, setPatternControl]);

  /**
   * --------------------------------
   * Dynamic pattern controls
   * --------------------------------
   *
   * Experience knows NOTHING about
   * the actual shader options.
   */
  const { config: patternConfig, resetValues } = usePatternControls(patternId);

  return (
    <>
    <PatternValues key={patternId} config={patternConfig} resetValues={resetValues} />
    <Canvas
      shadows="percentage"
      dpr={[1, 2]}
      camera={{
        position: [0, 1.4, 6.8],

        fov: 35,

        isPerspectiveCamera: true,

        near: 0.1,

        far: 100,
      }}
      gl={async (props) => {
        const {
          powerPreference: _powerPreference,

          ...rendererProps
        } = props;

        const renderer = new THREE.WebGPURenderer({
          ...rendererProps,

          canvas: props.canvas as HTMLCanvasElement,

          antialias: true,

          forceWebGL: false,
        });

        await renderer.init();

        return renderer;
      }}
    >
      <Scene>
        <Pattern
          config={patternConfig}
          ref={patternRef}
        />
      </Scene>
    </Canvas>
    </>
  );
}
