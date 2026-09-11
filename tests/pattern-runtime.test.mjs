/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import ts from "typescript";

// Run the project's TypeScript directly without adding a test bundler dependency.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      specifier = new URL(`../${specifier.slice(2)}`, import.meta.url).href;
    }
    if (specifier.startsWith(".") || specifier.startsWith("file:")) {
      const url = new URL(specifier, context.parentURL);
      if (existsSync(fileURLToPath(`${url.href}.ts`))) {
        return { url: `${url.href}.ts`, shortCircuit: true };
      }
    }
    return nextResolve(specifier, context);
  },
  load(url, context, nextLoad) {
    if (url.endsWith(".ts") && !url.includes("node_modules")) {
      return {
        format: "module",
        source: ts.transpileModule(readFileSync(new URL(url), "utf8"), {
          compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
        }).outputText,
        shortCircuit: true,
      };
    }
    return nextLoad(url, context);
  },
});

const { patternRegistry, createPatternRuntime, createPatternFromConfig } = await import("../tsl/index.ts");
const { buildPatternOptions } = await import("../lib/patternLeva.ts");
const { Color } = await import("three/webgpu");

for (const entry of Object.values(patternRegistry)) {
  test(`pattern ${entry.id}: creates a material node`, () => {
    assert.ok(createPatternFromConfig({ patternIndex: entry.id }).isNode);
    const runtime = createPatternRuntime(entry.id);
    runtime.update(entry.defaultOptions);
    assert.ok(runtime.node.isNode);
  });
}

for (const id of [8, 9, 10, 11]) {
  test(`pattern ${id}: every Leva control updates an existing uniform`, () => {
    const entry = patternRegistry[id];
    const runtime = entry.create(entry.defaultOptions);
    const originalNode = runtime.node;
    const uniforms = Object.values(runtime.uniforms);
    const originalColors = uniforms.filter((u) => u.value?.isColor).map((u) => u.value);
    let count = 0;

    function walk(controls, path = []) {
      for (const [key, control] of Object.entries(controls)) {
        const current = [...path, key];
        if (control.type === "folder") { walk(control.controls, current); continue; }
        runtime.update(entry.defaultOptions);
        const before = uniforms.map((u) => u.value?.isColor ? u.value.getHexString() : u.value);
        const value = control.type === "color" ? "#ff1234" : 0.731;
        const options = buildPatternOptions(id, entry.defaultOptions, entry.controls, {
          [`pattern${id}__${current.join("__")}`]: value,
        });
        runtime.update(options);
        const after = uniforms.map((u) => u.value?.isColor ? u.value.getHexString() : u.value);
        const changed = after.filter((v, i) => v !== before[i]);
        assert.deepEqual(changed, [control.type === "color" ? new Color(value).getHexString() : value], current.join("."));
        assert.strictEqual(runtime.node, originalNode);
        Object.values(runtime.uniforms).forEach((u, i) => assert.strictEqual(u, uniforms[i]));
        uniforms.filter((u) => u.value?.isColor).forEach((u, i) => assert.strictEqual(u.value, originalColors[i]));
        count++;
      }
    }
    walk(entry.controls);
    assert.equal(count, uniforms.length);
    runtime.update();
    assert.deepEqual(
      uniforms.map((u) => u.value?.isColor ? u.value.getHexString() : u.value),
      Object.values(entry.create(entry.defaultOptions).uniforms).map((u) => u.value?.isColor ? u.value.getHexString() : u.value),
    );
  });
}
