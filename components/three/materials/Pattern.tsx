/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";

import { createPatternRuntime } from "@/tsl/index";
import type { PatternConfig } from "@/tsl/index";
import { useImperativeHandle, useLayoutEffect, useMemo, useRef } from "react";
import type * as THREE from "three/webgpu";

interface PatternProps {
  config: PatternConfig;
  ref?: React.Ref<THREE.NodeMaterial | null>;
}

export default function Pattern(props: PatternProps) {
  // A new pattern gets a fresh runtime and material; sliders keep both alive.
  return <PatternInstance key={props.config.patternIndex} {...props} />;
}

function PatternInstance({ config, ref }: PatternProps) {
  const materialRef = useRef<THREE.MeshBasicNodeMaterial>(null);
  const patternId = config.patternIndex;
  const runtime = useMemo(() => createPatternRuntime(patternId), [patternId]);

  useImperativeHandle(ref, () => materialRef.current!, []);

  useLayoutEffect(() => {
    runtime.update(config.options);
  }, [runtime, config.options]);

  return (
    <mesh position-y={1}>
      <planeGeometry args={[2, 2, 1, 1]} />
      <meshBasicNodeMaterial ref={materialRef} colorNode={runtime.node} />
    </mesh>
  );
}
