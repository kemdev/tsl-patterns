/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { patternRegistry } from "./registry";
import { Node } from "three/webgpu";

import type { PatternConfig, PatternId, PatternOptionsMap, PatternRegistry, PatternRuntime, PatternNode } from "./types";

export { patternRegistry };

function isPatternNode<T>(value: PatternNode | PatternRuntime<T>): value is PatternNode {
  return value instanceof Node;
}

export type {
  PatternId,
  PatternConfig,
  PatternOptionsMap,
  Pattern8Options,
  Pattern9Options,
  Pattern10Options,
} from "./types";

/** Create a graph once and update its uniforms for subsequent option changes. */
export function createPatternRuntime<K extends PatternId>(
  patternIndex: K,
  options?: PatternOptionsMap[K],
): PatternRuntime<PatternOptionsMap[K]> {
  const registry: PatternRegistry = patternRegistry;
  const entry = registry[patternIndex];
  const result = entry.create(options);
  if (isPatternNode(result)) return { node: result, update: () => {} };
  return result;
}

/** Retain the node-only helpers for consumers that do not need live controls. */
export function createPattern<K extends PatternId>(
  patternIndex: K,
  options?: PatternOptionsMap[K],
) {
  return createPatternRuntime(patternIndex, options).node;
}

export function createPatternFromConfig(config: PatternConfig) {
  return createPattern(config.patternIndex, config.options);
}

export function isPatternId(value: number): value is PatternId {
  return value in patternRegistry;
}
