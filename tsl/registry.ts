/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import {
  pattern1,
  pattern2,
  pattern3,
  pattern4,
  pattern5,
  pattern6,
  pattern7,
} from "./patterns/basicPatterns";

import { pattern8 } from "./patterns/pattern8";

import { pattern9 } from "./patterns/pattern9";

import { pattern10 } from "./patterns/pattern10";

import { colorControl, folderControl, numberControl } from "./controls";

import type { PatternRegistry } from "./types";
import { pattern11 } from "./patterns/pattern11";

export const patternRegistry = {
  /**
   * --------------------------------------------------
   * Pattern 1
   * --------------------------------------------------
   */

  1: {
    id: 1,

    name: "UV",

    description: "Displays the UV coordinates as RGB values.",

    category: "uv",

    defaultOptions: {},

    controls: {},

    create: pattern1,
  },

  /**
   * --------------------------------------------------
   * Pattern 2
   * --------------------------------------------------
   */

  2: {
    id: 2,

    name: "UV X",

    description: "Displays the horizontal UV coordinate.",

    category: "uv",

    defaultOptions: {},

    controls: {},

    create: pattern2,
  },

  /**
   * --------------------------------------------------
   * Pattern 3
   * --------------------------------------------------
   */

  3: {
    id: 3,

    name: "UV Stripes",

    description: "Repeating UV stripes.",

    category: "basic",

    defaultOptions: {},

    controls: {},

    create: pattern3,
  },

  /**
   * --------------------------------------------------
   * Pattern 4
   * --------------------------------------------------
   */

  4: {
    id: 4,

    name: "Checker",

    description: "Procedural checker pattern.",

    category: "procedural",

    defaultOptions: {},

    controls: {},

    create: pattern4,
  },

  /**
   * --------------------------------------------------
   * Pattern 5
   * --------------------------------------------------
   */

  5: {
    id: 5,

    name: "Radial Distance",

    description: "Distance from the center of the UV space.",

    category: "uv",

    defaultOptions: {},

    controls: {},

    create: pattern5,
  },

  /**
   * --------------------------------------------------
   * Pattern 6
   * --------------------------------------------------
   */

  6: {
    id: 6,

    name: "Polar Angle",

    description: "Polar UV angle visualization.",

    category: "uv",

    defaultOptions: {},

    controls: {},

    create: pattern6,
  },

  /**
   * --------------------------------------------------
   * Pattern 7
   * --------------------------------------------------
   */

  7: {
    id: 7,

    name: "Random Grid",

    description: "Random values generated per grid cell.",

    category: "noise",

    defaultOptions: {},

    controls: {},

    create: pattern7,
  },

  /**
   * --------------------------------------------------
   * Pattern 8
   * --------------------------------------------------
   */

  8: {
    id: 8,

    name: "Perlin Lines",

    description: "Animated stepped Perlin noise.",

    category: "noise",

    /**
     * THE values live here.
     */
    defaultOptions: {
      perlinUvInput: 5,

      perlinNoiseMultiplier: 5,

      perlinNoiseStep: 0.8,
    },

    /**
     * Only UI information lives here.
     *
     * No duplicate values.
     */
    controls: {
      perlinUvInput: numberControl({
        label: "UV Scale",

        min: 0.1,
        max: 30,
        step: 0.1,
      }),

      perlinNoiseMultiplier: numberControl({
        label: "Noise Multiplier",

        min: 0,
        max: 20,
        step: 0.1,
      }),

      perlinNoiseStep: numberControl({
        label: "Noise Step",

        min: 0,
        max: 1,
        step: 0.01,
      }),
    },

    create: pattern8,
  },

  /**
   * --------------------------------------------------
   * Pattern 9
   * --------------------------------------------------
   */

  9: {
    id: 9,

    name: "Worley Palette",

    description: "Animated Worley noise with a color palette.",

    category: "noise",

    defaultOptions: {
      worleyUvMultiplier: 10,

      color1: "#805066",

      color2: "#e68066",

      color3: "#ffffff",

      color4: "#001a33",
    },

    controls: {
      worleyUvMultiplier: numberControl({
        label: "UV Scale",

        min: 0.1,
        max: 30,
        step: 0.1,
      }),

      color1: colorControl({
        label: "Color 1",
      }),

      color2: colorControl({
        label: "Color 2",
      }),

      color3: colorControl({
        label: "Color 3",
      }),

      color4: colorControl({
        label: "Color 4",
      }),
    },

    create: pattern9,
  },

  /**
   * --------------------------------------------------
   * Pattern 10
   * --------------------------------------------------
   */

  10: {
    id: 10,

    name: "Caustic Water",

    description: "Layered caustics, foam and lily pads.",

    category: "material",

    defaultOptions: {
      depth: {
        uvMultiplier: 0.5,

        colors: {
          near: "#1b3956",

          far: "#11eeff",
        },
      },

      caustics: {
        inputMultiplier: 8,

        speed: 0.3,

        intensity: 3,
      },

      foam: {
        intensity: 5,

        noiseSpeed: 0.1,

        mask: 0.05,

        color: "#e5f7ff",
      },

      lilyPads: {
        noiseMultiplier: 4,

        step: 0.4,

        color1: "#d7e689",

        color2: "#329a89",
      },
    },

    controls: {
      depth: folderControl(
        {
          uvMultiplier: numberControl({
            label: "UV Multiplier",

            min: 0,
            max: 2,
            step: 0.01,
          }),

          /**
           * We can even nest folders.
           */
          colors: folderControl(
            {
              near: colorControl({
                label: "Near",
              }),

              far: colorControl({
                label: "Far",
              }),
            },
            {
              label: "Colors",
            },
          ),
        },
        {
          label: "Depth",

          collapsed: false,
        },
      ),

      caustics: folderControl(
        {
          inputMultiplier: numberControl({
            label: "Scale",

            min: 0.1,
            max: 30,
            step: 0.1,
          }),

          speed: numberControl({
            label: "Speed",

            min: 0,
            max: 2,
            step: 0.01,
          }),

          intensity: numberControl({
            label: "Intensity",

            min: 0.1,
            max: 10,
            step: 0.1,
          }),
        },
        {
          label: "Caustics",
        },
      ),

      foam: folderControl(
        {
          intensity: numberControl({
            label: "Scale",

            min: 0.1,
            max: 30,
            step: 0.1,
          }),

          noiseSpeed: numberControl({
            label: "Speed",

            min: 0,
            max: 2,
            step: 0.01,
          }),

          mask: numberControl({
            label: "Mask",

            min: 0,
            max: 1,
            step: 0.001,
          }),

          color: colorControl({
            label: "Color",
          }),
        },
        {
          label: "Foam",
        },
      ),

      lilyPads: folderControl(
        {
          noiseMultiplier: numberControl({
            label: "Scale",

            min: 0.1,
            max: 30,
            step: 0.1,
          }),

          step: numberControl({
            label: "Threshold",

            min: 0,
            max: 1,
            step: 0.01,
          }),

          color1: colorControl({
            label: "Color 1",
          }),

          color2: colorControl({
            label: "Color 2",
          }),
        },
        {
          label: "Lily Pads",
        },
      ),
    },

    create: pattern10,
  },
  11: {
    id: 11,

    name: "Glass Caustics",

    description: "Animated glass-like caustic pattern.",

    category: "material",

    defaultOptions: {
      scale: 5,

      speed: 0.2,

      intensity: 3,

      color: "#88ddff",
    },

    controls: {
      scale: numberControl({
        min: 1,

        max: 20,

        step: 0.1,
      }),

      speed: numberControl({
        min: 0,

        max: 2,

        step: 0.01,
      }),

      intensity: numberControl({
        min: 0,

        max: 10,

        step: 0.1,
      }),

      color: colorControl(),
    },

    create: pattern11,
  },
} satisfies PatternRegistry;
