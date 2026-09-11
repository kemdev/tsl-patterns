/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import type { MeshBasicNodeMaterial } from "three/webgpu";

export type PatternNode = NonNullable<MeshBasicNodeMaterial["colorNode"]>;

/**
 * --------------------------------------------------
 * Pattern options
 * --------------------------------------------------
 */
export type EmptyPatternOptions = Record<string, never>;

export type ColorInput = string | number;
export interface Pattern8Options {
  perlinUvInput?: number;
  perlinNoiseMultiplier?: number;
  perlinNoiseStep?: number;
}

export interface Pattern9Options {
  worleyUvMultiplier?: number;

  color1?: ColorInput;
  color2?: ColorInput;
  color3?: ColorInput;
  color4?: ColorInput;
}

export interface Pattern10Options {
  depth?: {
    uvMultiplier?: number;

    colors?: {
      near?: ColorInput;
      far?: ColorInput;
    };
  };

  caustics?: {
    inputMultiplier?: number;
    speed?: number;
    intensity?: number;
  };

  foam?: {
    intensity?: number;
    noiseSpeed?: number;
    mask?: number;
    color?: ColorInput;
  };

  lilyPads?: {
    noiseMultiplier?: number;
    step?: number;

    color1?: ColorInput;
    color2?: ColorInput;
  };
}

export interface Pattern11Options {
  scale?: number;

  speed?: number;

  intensity?: number;

  color?: ColorInput;
}

/**
 * --------------------------------------------------
 * Pattern map
 * --------------------------------------------------
 */
export interface PatternOptionsMap {
  1: EmptyPatternOptions;
  2: EmptyPatternOptions;
  3: EmptyPatternOptions;
  4: EmptyPatternOptions;
  5: EmptyPatternOptions;
  6: EmptyPatternOptions;
  7: EmptyPatternOptions;

  8: Pattern8Options;
  9: Pattern9Options;
  10: Pattern10Options;
  11: Pattern11Options;
}

export type PatternId = keyof PatternOptionsMap;

export type PatternCategory =
  | "basic"
  | "uv"
  | "noise"
  | "procedural"
  | "material";

/**
 * --------------------------------------------------
 * Leva control definitions
 *
 * Notice:
 *
 * There is NO `value` here.
 *
 * Values always come from defaultOptions.
 * --------------------------------------------------
 */

export interface NumberPatternControl {
  type: "number";

  label?: string;

  min?: number;
  max?: number;
  step?: number;
}

export interface ColorPatternControl {
  type: "color";

  label?: string;
}

export interface BooleanPatternControl {
  type: "boolean";

  label?: string;
}

export interface FolderPatternControl {
  type: "folder";

  label?: string;

  collapsed?: boolean;

  controls: PatternControlsSchema;
}

export type PatternControlDefinition =
  | NumberPatternControl
  | ColorPatternControl
  | BooleanPatternControl
  | FolderPatternControl;

export type PatternControlsSchema = Record<string, PatternControlDefinition>;

/**
 * --------------------------------------------------
 * Registry
 * --------------------------------------------------
 */
export interface PatternRuntime<T> {
  node: PatternNode;
  update: (options?: T) => void;
}

export interface PatternRegistryEntry<K extends PatternId> {
  id: K;

  name: string;

  description?: string;

  category: PatternCategory;

  defaultOptions: PatternOptionsMap[K];

  /**
   * UI metadata only.
   *
   * Values are always taken from
   * defaultOptions.
   */
  controls: PatternControlsSchema;

  create: (options?: PatternOptionsMap[K]) => PatternNode | PatternRuntime<PatternOptionsMap[K]>;
}

export type PatternRegistry = {
  [K in PatternId]: PatternRegistryEntry<K>;
};

/**
 * Creates a discriminated union like:
 *
 * {
 *   patternIndex: 8;
 *   options?: Pattern8Options;
 * }
 *
 * |
 *
 * {
 *   patternIndex: 9;
 *   options?: Pattern9Options;
 * }
 */
export type PatternConfig = {
  [K in PatternId]: {
    patternIndex: K;
    options?: PatternOptionsMap[K];
  };
}[PatternId];
