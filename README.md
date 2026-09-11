# TSL Patterns

An interactive shader playground built with Next.js, React Three Fiber, and Three.js Shading Language (TSL). Explore procedural patterns on a 3D plane, adjust their parameters in real time, and copy the resulting configuration as JSON.

## Features

- **11 procedural patterns:** UV visualizations, stripes, checkerboards, noise, palettes, and animated caustics.
- **Live controls:** Leva builds sliders, color pickers, and nested folders from each pattern's registry definition.
- **Uniform-based updates:** Patterns 8–11 update existing TSL uniforms when settings change. Slider changes keep the same shader graph; selecting another pattern creates a fresh runtime and material.
- **Reset controls:** Restore every value in the selected pattern, or reset individual top-level groups such as Depth, Caustics, Foam, and Lily Pads.
- **Live JSON panel:** Inspect and copy the selected pattern ID and all current options as formatted JSON.
- **Pattern gallery:** Expand the bottom thumbnail gallery to select patterns 1–10. All 11 patterns are available in the Leva selector.
- **Camera controls:** Orbit, pan, and zoom around the plane, then use the camera reset button to return smoothly to the initial view.
- **Procedural floor:** An infinite grid with axis indicators and distance fading.
- **Remembered selection:** Zustand persists the selected pattern ID in browser storage. Edited parameter values are not persisted across reloads.

## Patterns

| ID | Pattern | Adjustable settings |
| --- | --- | --- |
| 1 | UV | None |
| 2 | UV X | None |
| 3 | UV Stripes | None |
| 4 | Checker | None |
| 5 | Radial Distance | None |
| 6 | Polar Angle | None |
| 7 | Random Grid | None |
| 8 | Perlin Lines | UV scale, noise multiplier, threshold |
| 9 | Worley Palette | UV scale and four palette colors |
| 10 | Caustic Water | Depth, caustics, foam, and lily-pad settings |
| 11 | Glass Caustics | Scale, speed, intensity, and color |

## Tech stack

Versions below are the declarations in `package.json`; `bun.lock` records the resolved dependencies.

| Technology | Version / source | Role |
| --- | --- | --- |
| Next.js | 16.3.4 | App Router, application shell, development server, and build tooling |
| React / React DOM | 19.2.8 | Components, hooks, and interactive UI |
| TypeScript | ^5 | Typed pattern options, registry entries, and shader runtimes |
| Three.js | GitHub `mrdoob/three.js#dev` | `WebGPURenderer`, node materials, and TSL shader graphs |
| React Three Fiber | ^9.7.0 | React rendering and lifecycle integration for the 3D scene |
| Drei | ^10.7.8 | OrbitControls and reusable Three.js helpers |
| Leva | ^0.10.1 | Pattern selection, parameter controls, and camera reset |
| Zustand | ^5.0.15 | Selected-pattern state and browser persistence |
| Tailwind CSS / PostCSS plugin | ^4 | UI styling |
| React Icons | ^5.7.0 | Gallery toggle icon |
| ESLint / eslint-config-next | ^9 / 16.3.4 | Code linting |
| Bun | 1.3.14 | Declared package manager and lockfile |
| Node.js test runner | Built into Node.js | Shader runtime regression checks |

`@pmndrs/assets` (^1.7.0) and `suspend-react` (^0.1.3) are also declared dependencies, but the current source does not import them directly.

## Getting started

Use Bun 1.3.14 and Node.js 24 for the commands below. Node.js 24 also supports the module hooks used by the runtime tests. A WebGPU-capable browser is the intended rendering target; the scene initializes Three.js `WebGPURenderer` with `forceWebGL: false`.

```bash
git clone git@github.com:kemdev/tsl-patterns.git
cd tsl-patterns
bun install --frozen-lockfile
bun dev
```

Open [localhost:3000](http://localhost:3000). No application API keys or environment variables are required. Installation requires network access, and the Next.js font setup downloads Geist fonts during a build.

### Using the playground

1. Select a pattern under **Choose a Pattern** in Leva, or expand the bottom gallery.
2. Open **Pattern Settings** and adjust the available controls. Patterns 1–7 have no editable parameters.
3. Inspect the object in the **Values** panel. Collapse the panel using its heading when you need more viewport space.
4. Use **Reset all values** to restore the selected pattern's defaults. Group reset buttons restore only their corresponding settings.
5. Select **Copy JSON** to copy the complete configuration. If clipboard access fails, select the displayed JSON and copy it manually.

For example, the exported configuration for pattern 8 has this shape:

```json
{
  "patternIndex": 8,
  "options": {
    "perlinUvInput": 5,
    "perlinNoiseMultiplier": 5,
    "perlinNoiseStep": 0.8
  }
}
```

JSON export is currently one-way: there is no UI for importing presets.

## Commands

```bash
bun dev                         # Start the development server
bun run build                   # Create a production build
bun start                       # Serve a completed production build
bun run lint                    # Run ESLint
node --test tests/pattern-runtime.test.mjs
node node_modules/typescript/bin/tsc --noEmit --incremental false
```

The runtime tests cover all 11 pattern factories and verify that each editable control changes the existing uniforms without replacing the graph, uniform objects, or color objects. They do not render pixels or test browser clipboard behavior.

### Current limitation

The last type check reports an existing error in `components/three/htmls/Screen2.tsx`: it passes the old `patternIndex` prop to `Pattern`, which now accepts a `config` object. This must be corrected for a clean type check and production build.

## How the patterns work

The registry combines pattern metadata, default options, control definitions, and factory functions. Leva uses that metadata to create the UI; the control adapter converts flat Leva values back into nested pattern options.

```text
Pattern selection → registry factory → runtime + node material
Parameter changes → nested options → runtime.update(options) → uniform values
```

The basic factories return nodes directly. The runtime adapter gives them the same interface as editable patterns. Patterns 8–11 return a node, their uniforms, and an update function. React keeps the runtime alive while values change and remounts the material when the selected pattern changes.

## Project structure

```text
app/                         Next.js page, layout, and global styles
components/three/            Scene, camera, grid, and pattern material
components/ui/               Thumbnail gallery and JSON/reset panel
hooks/usePatternControls.ts  Registry-driven Leva controls
lib/patternLeva.ts           Nested options, Leva keys, and reset values
stores/selectedPattern.ts    Persisted selected-pattern state
tsl/registry.ts              Pattern metadata, defaults, and controls
tsl/types.ts                 Option types and registry/runtime contracts
tsl/runtime.ts               Numeric and color uniform bindings
tsl/patterns/                Procedural TSL implementations
tests/                       Runtime regression tests
public/images/               Pattern gallery thumbnails
```

### Adding a pattern

1. Define its option type and ID in `tsl/types.ts`.
2. Add a factory in `tsl/patterns/`. For editable parameters, use uniform nodes in the graph and update their values through the runtime.
3. Register its metadata, defaults, controls, and factory in `tsl/registry.ts`. The Leva selector and controls derive from this registry.
4. To include a thumbnail, add an image under `public/images/` and an entry in `util/images.ts`.
5. Extend the runtime tests for any new editable pattern.

## ChatGPT attribution

Project source code was generated or edited with ChatGPT. See the [reference conversation](https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e). Source files include attribution comments, and this README was also edited with ChatGPT.

JSON configuration files, the lockfile, and generated framework files retain their required formats. This attribution also documents ChatGPT assistance with project configuration. Third-party dependencies and assets retain their original authorship.

## License

[MIT](LICENSE) — Copyright (c) 2026 Abdulkarim Alarmanazi.
