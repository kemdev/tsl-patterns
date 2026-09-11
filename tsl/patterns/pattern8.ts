/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { mx_noise_float, time, uv, vec3 } from "three/tsl";
import type { Pattern8Options } from "../types";
import { createUniformBindings } from "../runtime";

export function pattern8(options: Pattern8Options = {}) {
  const bindings = createUniformBindings<Pattern8Options>();
  const uniforms = {
    perlinUvInput: bindings.number((o) => o.perlinUvInput ?? 5, options),
    perlinNoiseMultiplier: bindings.number((o) => o.perlinNoiseMultiplier ?? 5, options),
    perlinNoiseStep: bindings.number((o) => o.perlinNoiseStep ?? 0.8, options),
  };
  const { perlinUvInput, perlinNoiseMultiplier, perlinNoiseStep } = uniforms;

  const perlinUv = uv().mul(perlinUvInput);
  const perlinNoise = mx_noise_float(perlinUv);
  const node = vec3(perlinNoise.mul(perlinNoiseMultiplier).add(time).fract().step(perlinNoiseStep));

  return { node, uniforms, update: (next: Pattern8Options = {}) => bindings.update(next) };
}
