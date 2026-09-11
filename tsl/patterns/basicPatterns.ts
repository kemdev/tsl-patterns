/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { atan, checker, PI, rand, uv, vec2, vec3 } from "three/tsl";

export function pattern1() {
  return vec3(uv(), 1);
}

export function pattern2() {
  return vec3(uv().x);
}

export function pattern3() {
  return vec3(uv().x.mul(10).fract());
}

export function pattern4() {
  return vec3(checker(uv().mul(10)).oneMinus());
}

export function pattern5() {
  return vec3(uv().distance(vec2(0.5)));
}

export function pattern6() {
  const polarUv = uv().sub(0.5);

  const angle = atan(polarUv.x, polarUv.y);

  return vec3(angle.remap(PI.negate(), PI, 0, 1));
}

export function pattern7() {
  const subdivision = 10;

  const gridUv = uv().mul(subdivision).floor();

  const random = rand(gridUv);

  return vec3(random);
}
