/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { uniform } from "three/tsl";
import { Color } from "three/webgpu";
import type { ColorInput } from "./types";

/** Bind option readers once; updates only change the existing uniform values. */
export function createUniformBindings<T>() {
  const updates: Array<(options: T) => void> = [];
  return {
    number(read: (options: T) => number, options: T) {
      const node = uniform(read(options));
      updates.push((next) => { node.value = read(next); });
      return node;
    },
    color(read: (options: T) => ColorInput, options: T) {
      const node = uniform(new Color(read(options)));
      updates.push((next) => { node.value.set(read(next)); });
      return node;
    },
    update(options: T) {
      updates.forEach((update) => update(options));
    },
  };
}
