/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";

import { useState } from "react";
import { patternRegistry, type PatternConfig } from "@/tsl/index";

export default function PatternValues({ config, resetValues }: {
  config: PatternConfig;
  resetValues: (group?: string) => void;
}) {
  const entry = patternRegistry[config.patternIndex];
  const json = JSON.stringify(config, null, 2);
  const [copyResult, setCopyResult] = useState<{ json: string; message: string } | null>(null);
  const groups = Object.entries(entry.controls).filter(([, control]) => control.type === "folder");
  const buttonClass = "rounded-md border border-white/15 px-3 py-1.5 text-xs hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-sky-400 disabled:opacity-40";

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(json);
      setCopyResult({ json, message: "Copied JSON" });
    } catch {
      setCopyResult({ json, message: "Copy unavailable. Select the JSON below and copy it manually." });
    }
  }

  return (
    <aside className="fixed left-3 top-3 z-10 w-[min(340px,calc(100vw-24px))] rounded-xl border border-white/10 bg-neutral-950/90 p-4 text-neutral-200 shadow-xl backdrop-blur">
      <details open>
        <summary className="cursor-pointer text-sm font-semibold">{entry.name} · Values</summary>
        <p className="my-3 text-xs text-neutral-400">Live values for the selected pattern.</p>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={buttonClass} disabled={!Object.keys(entry.controls).length} onClick={() => resetValues()}>Reset all values</button>
          <button type="button" className={buttonClass} onClick={copyJson}>Copy JSON</button>
          {groups.map(([key, control]) => (
            <button type="button" key={key} className={buttonClass} onClick={() => resetValues(key)}>Reset {control.label ?? key}</button>
          ))}
        </div>
        <p role="status" className="my-2 text-xs text-sky-300">{copyResult?.json === json ? copyResult.message : ""}</p>
        <pre tabIndex={0} aria-label="Current pattern JSON" className="max-h-[45dvh] overflow-auto rounded-lg bg-black/40 p-3 font-mono text-xs leading-relaxed select-text"><code>{json}</code></pre>
      </details>
    </aside>
  );
}
