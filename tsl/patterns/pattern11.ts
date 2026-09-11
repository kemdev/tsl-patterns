/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { mx_worley_noise_float, time, uv, vec3 } from "three/tsl";

import type { Pattern11Options } from "../types";

import { createUniformBindings } from "../runtime";

export function pattern11(options: Pattern11Options = {}) {
  const bindings = createUniformBindings<Pattern11Options>();
  const uniforms = {
    scale: bindings.number((o) => o.scale ?? 5, options),
    speed: bindings.number((o) => o.speed ?? 0.2, options),
    intensity: bindings.number((o) => o.intensity ?? 3, options),
    causticColor: bindings.color((o) => o.color ?? "#88ddff", options),
  };
  const { scale, speed, intensity, causticColor } = uniforms;

  const input = vec3(
    uv().mul(scale),

    time.mul(speed),
  );

  const noise = mx_worley_noise_float(input).pow(intensity);

  const node = causticColor.mul(noise);

  return { node, uniforms, update: (next: Pattern11Options = {}) => bindings.update(next) };
}
