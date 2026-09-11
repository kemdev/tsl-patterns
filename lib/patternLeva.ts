/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { folder as levaFolder } from "leva";

import type {
  PatternControlDefinition,
  PatternControlsSchema,
} from "@/tsl/types";

/**
 * Leva returns a flat object.
 *
 * We use fully-qualified internal names such as:
 *
 * depth__uvMultiplier
 * depth__colors__near
 * caustics__speed
 *
 * That prevents collisions between nested properties.
 */

const PATH_SEPARATOR = "__";

export type LevaPatternValues = Record<string, unknown>;

/** Flatten defaults using the same keys as the live Leva controls. */
export function buildPatternResetValues(
  patternId: number,
  defaults: Record<string, unknown>,
  controls: PatternControlsSchema,
  group?: string,
): LevaPatternValues {
  const values: LevaPatternValues = {};
  function walk(schema: PatternControlsSchema, path: string[] = []) {
    for (const [key, definition] of Object.entries(schema)) {
      const current = [...path, key];
      if (group && current[0] !== group) continue;
      if (definition.type === "folder") {
        walk(definition.controls, current);
      } else {
        values[getControlKey(patternId, current)] = getValueAtPath(defaults, current);
      }
    }
  }
  walk(controls);
  return values;
}

/**
 * --------------------------------------------------
 * Path utilities
 * --------------------------------------------------
 */

function getValueAtPath(object: unknown, path: string[]): unknown {
  let current = object as Record<string, unknown>;

  for (const key of path) {
    if (current == null || typeof current !== "object") {
      return undefined;
    }

    current = current[key] as Record<string, unknown>;
  }

  return current;
}

function setValueAtPath(
  object: Record<string, unknown>,

  path: string[],

  value: unknown,
) {
  let current = object;

  path.forEach((key, index) => {
    const isLast = index === path.length - 1;

    if (isLast) {
      current[key] = value;

      return;
    }

    const next = current[key];

    if (!next || typeof next !== "object" || Array.isArray(next)) {
      current[key] = {};
    }

    current = current[key] as Record<string, unknown>;
  });
}

/**
 * Deep clone plain pattern option objects.
 *
 * Our pattern options are plain serializable
 * configuration values, so this is sufficient.
 */
function cloneOptions<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(cloneOptions) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, cloneOptions(entry)]),
    ) as T;
  }

  return value;
}

/**
 * --------------------------------------------------
 * Internal control key
 * --------------------------------------------------
 */

function getControlKey(
  patternId: number,

  path: string[],
) {
  return [`pattern${patternId}`, ...path].join(PATH_SEPARATOR);
}

/**
 * --------------------------------------------------
 * Convert one control definition into Leva config
 * --------------------------------------------------
 */

function createLevaControl(
  definition: Exclude<
    PatternControlDefinition,
    {
      type: "folder";
    }
  >,

  value: unknown,
) {
  switch (definition.type) {
    case "number":
      return {
        value,

        label: definition.label,

        min: definition.min,

        max: definition.max,

        step: definition.step,
      };

    case "color":
      return {
        value,

        label: definition.label,
      };

    case "boolean":
      return {
        value,

        label: definition.label,
      };
  }
}

/**
 * --------------------------------------------------
 * Build Leva schema recursively
 * --------------------------------------------------
 */

export function buildPatternLevaSchema(
  patternId: number,

  defaults: Record<string, unknown>,

  controls: PatternControlsSchema,
) {
  function walk(
    schema: PatternControlsSchema,

    path: string[] = [],
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {};

    for (const [propertyName, definition] of Object.entries(schema)) {
      const currentPath = [...path, propertyName];

      /**
       * Folder
       */
      if (definition.type === "folder") {
        const folderName = definition.label ?? propertyName;

        result[folderName] = levaFolder(
          walk(
            definition.controls as PatternControlsSchema,
            currentPath as string[],
          ) as Parameters<typeof levaFolder>[0],
          {
            collapsed: definition.collapsed ?? true,
          },
        );

        continue;
      }

      /**
       * Leaf control
       */
      const defaultValue = getValueAtPath(defaults, currentPath);

      const controlKey = getControlKey(patternId, currentPath);

      result[controlKey] = createLevaControl(definition, defaultValue);
    }

    return result;
  }

  return walk(controls);
}

/**
 * --------------------------------------------------
 * Convert flat Leva values back to nested options
 * --------------------------------------------------
 */

export function buildPatternOptions<T>(
  patternId: number,

  defaults: T,

  controls: PatternControlsSchema,

  values: LevaPatternValues,
): T {
  const result = cloneOptions(defaults) as Record<string, unknown>;

  function walk(
    schema: PatternControlsSchema,

    path: string[] = [],
  ) {
    for (const [propertyName, definition] of Object.entries(schema)) {
      const currentPath = [...path, propertyName];

      if (definition.type === "folder") {
        walk(definition.controls, currentPath);

        continue;
      }

      const controlKey = getControlKey(patternId, currentPath);

      const value = values[controlKey];

      /**
       * During schema transitions Leva can briefly
       * omit a value. In that case we simply keep
       * the original registry default.
       */
      if (value === undefined) {
        continue;
      }

      setValueAtPath(result, currentPath, value);
    }
  }

  walk(controls);

  return result as T;
}
