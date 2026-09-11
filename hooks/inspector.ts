/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

type InspectorRuntime = {
	setRenderer: (renderer: unknown) => InspectorRuntime;
	dispose: () => void;
};

export function useThreeInspector() {
	const renderer = useThree((state) => state.gl);

	useEffect(() => {
		let inspector: InspectorRuntime | undefined;
		let cancelled = false;

		void import(
			/* webpackChunkName: "three-inspector" */
			"three/addons/inspector/Inspector.js"
		)
			.then(({ Inspector }) => {
				if (cancelled) return;

				inspector = new Inspector() as unknown as InspectorRuntime;
				inspector.setRenderer(renderer);
			})
			.catch((error: unknown) => {
				if (!cancelled) {
					console.error("Failed to load Three.js Inspector", error);
				}
			});

		return () => {
			cancelled = true;
			inspector?.dispose();
		};
	}, [renderer]);
}
