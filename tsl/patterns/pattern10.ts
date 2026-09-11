/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import {
  float,
  mix,
  mx_noise_float,
  mx_worley_noise_float,
  parallaxUV,
  time,
  uv,
  vec3,
} from "three/tsl";

import type { Pattern10Options } from "../types";

import { createUniformBindings } from "../runtime";

export function pattern10(options: Pattern10Options = {}) {
  const bindings = createUniformBindings<Pattern10Options>();
  const uniforms = {
    uvMultiplier: bindings.number((o) => o.depth?.uvMultiplier ?? 0.5, options),
    near: bindings.color((o) => o.depth?.colors?.near ?? 0x1b3956, options),
    far: bindings.color((o) => o.depth?.colors?.far ?? 0x11eeff, options),
    inputMultiplier: bindings.number((o) => o.caustics?.inputMultiplier ?? 8, options),
    speed: bindings.number((o) => o.caustics?.speed ?? 0.3, options),
    intensity: bindings.number((o) => o.caustics?.intensity ?? 3, options),
    foamIntensity: bindings.number((o) => o.foam?.intensity ?? 5, options),
    noiseSpeed: bindings.number((o) => o.foam?.noiseSpeed ?? 0.1, options),
    foamMaskThreshold: bindings.number((o) => o.foam?.mask ?? 0.05, options),
    foamColorValue: bindings.color((o) => o.foam?.color ?? 0xe5f7ff, options),
    noiseMultiplier: bindings.number((o) => o.lilyPads?.noiseMultiplier ?? 4, options),
    step: bindings.number((o) => o.lilyPads?.step ?? 0.4, options),
    color1: bindings.color((o) => o.lilyPads?.color1 ?? 0xd7e689, options),
    color2: bindings.color((o) => o.lilyPads?.color2 ?? 0x329a89, options),
  };
  const { uvMultiplier, near, far, inputMultiplier, speed, intensity, foamIntensity, noiseSpeed, foamMaskThreshold, foamColorValue, noiseMultiplier, step, color1, color2 } = uniforms;

  const depthUv = parallaxUV(uv(), float(uvMultiplier)) as ReturnType<
    typeof uv
  >;

  /**
   * --------------------------------
   * Caustics
   * --------------------------------
   */


  const causticsInput = vec3(
    depthUv.xy.mul(inputMultiplier),

    time.mul(speed),
  );

  const causticsNoise = mx_worley_noise_float(causticsInput).pow(intensity);

  const depthColor = mix(near, far, causticsNoise);

  /**
   * --------------------------------
   * Foam
   * --------------------------------
   */


  const foamInput = uv().mul(foamIntensity);

  const foamNoise = mx_noise_float(
    vec3(
      foamInput,

      time.mul(noiseSpeed),
    ),
  );

  const foamMask = foamNoise.abs().step(foamMaskThreshold).oneMinus();

  const foamColor = foamColorValue;

  /**
   * --------------------------------
   * Lily pads
   * --------------------------------
   */


  const lilyPadInput = vec3(uv().mul(noiseMultiplier), 0);

  const lilyPadNoise = mx_worley_noise_float(lilyPadInput);

  const lilyPadMask = lilyPadNoise.step(step).oneMinus();

  const lilyPadColor = mix(
    color1,

    color2,

    lilyPadNoise.div(step),
  );

  /**
   * --------------------------------
   * Final composition
   * --------------------------------
   */

  let finalColor = mix(depthColor, foamColor, foamMask);

  finalColor = mix(finalColor, lilyPadColor, lilyPadMask);

  const node = finalColor;

  return { node, uniforms, update: (next: Pattern10Options = {}) => bindings.update(next) };
}
