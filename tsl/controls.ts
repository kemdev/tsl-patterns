/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import type {
  BooleanPatternControl,
  ColorPatternControl,
  FolderPatternControl,
  NumberPatternControl,
  PatternControlsSchema,
} from "./types";

/**
 * --------------------------------------------------
 * Number
 * --------------------------------------------------
 */

export function numberControl(
  options: Omit<NumberPatternControl, "type"> = {},
): NumberPatternControl {
  return {
    type: "number",
    ...options,
  };
}

/**
 * --------------------------------------------------
 * Color
 * --------------------------------------------------
 */

export function colorControl(
  options: Omit<ColorPatternControl, "type"> = {},
): ColorPatternControl {
  return {
    type: "color",
    ...options,
  };
}

/**
 * --------------------------------------------------
 * Boolean
 * --------------------------------------------------
 */

export function booleanControl(
  options: Omit<BooleanPatternControl, "type"> = {},
): BooleanPatternControl {
  return {
    type: "boolean",
    ...options,
  };
}

/**
 * --------------------------------------------------
 * Folder
 * --------------------------------------------------
 */

export function folderControl(
  controls: PatternControlsSchema,

  options: {
    label?: string;
    collapsed?: boolean;
  } = {},
): FolderPatternControl {
  return {
    type: "folder",

    controls,

    ...options,
  };
}
