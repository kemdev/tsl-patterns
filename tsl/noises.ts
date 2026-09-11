/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { cos, Fn, mul } from "three/tsl";

export const palette = /*@__PURE__*/ Fn(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ([t, a, b, c, d]: [any, any, any, any, any]) => {
    return a.add(b.mul(cos(mul(6.283185, c.mul(t).add(d)))));
  },
  { t: "float", a: "vec3", b: "vec3", c: "vec3", d: "vec3", return: "vec3" },
);