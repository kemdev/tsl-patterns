/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { mx_worley_noise_float, time, uv, vec3 } from "three/tsl";

import { palette } from "../noises";

import type { Pattern9Options } from "../types";

import { createUniformBindings } from "../runtime";

export function pattern9(options: Pattern9Options = {}) {
  const bindings = createUniformBindings<Pattern9Options>();
  const uniforms = {
    worleyUvMultiplier: bindings.number((o) => o.worleyUvMultiplier ?? 10, options),
    color1: bindings.color((o) => o.color1 ?? 0x805066, options),
    color2: bindings.color((o) => o.color2 ?? 0xe68066, options),
    color3: bindings.color((o) => o.color3 ?? 0xffffff, options),
    color4: bindings.color((o) => o.color4 ?? 0x001a33, options),
  };
  const { worleyUvMultiplier, color1, color2, color3, color4 } = uniforms;

  const worleyUv = uv().mul(worleyUvMultiplier);

  const worleyNoise = mx_worley_noise_float(vec3(worleyUv, time));

  const node = palette(
    worleyNoise,
    color1,
    color2,
    color3,
    color4,
  );

  return { node, uniforms, update: (next: Pattern9Options = {}) => bindings.update(next) };
}
