/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";

import { useMemo } from "react";

import { useControls } from "leva";

import { patternRegistry } from "@/tsl/index";

import type { PatternConfig, PatternId, PatternOptionsMap } from "@/tsl/index";

import {
  buildPatternLevaSchema,
  buildPatternOptions,
  buildPatternResetValues,
} from "@/lib/patternLeva";
import { Schema } from "leva/dist/declarations/src/types";

export default function usePatternControls<K extends PatternId>(
  patternId: K,
) {
  const entry = patternRegistry[patternId];

  /**
   * Build the schema automatically
   * from:
   *
   * defaultOptions + controls
   */
  const schema = useMemo(
    () =>
      buildPatternLevaSchema(patternId, entry.defaultOptions, entry.controls),
    [patternId, entry],
  );

  /**
   * Recreate the controls whenever
   * the selected pattern changes.
   */
  const [values, setValues] = useControls(
    "Pattern Settings",

    () => schema as Schema,

    [patternId, schema],
  );

  /**
   * Convert Leva's flat values into
   * the nested option object expected
   * by the TSL pattern.
   */
  const options = buildPatternOptions(
    patternId,
    entry.defaultOptions,
    entry.controls,
    values,
  );

  const config = {
    patternIndex: patternId,

    options: options as PatternOptionsMap[K],
  } as PatternConfig;

  function resetValues(group?: string) {
    const defaults = buildPatternResetValues(
      patternId, entry.defaultOptions, entry.controls, group,
    );
    // The recursive schema is dynamic; these keys and values come from that same schema.
    setValues(defaults as Parameters<typeof setValues>[0]);
  }

  return { config, resetValues };
}
