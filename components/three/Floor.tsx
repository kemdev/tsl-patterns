/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";
import InfiniteGrid from "./InfiniteGridV2";
export default function Floor() {
  return (
    <InfiniteGrid
      cellColor="#2c2c2c"
      sectionSize={3}
      sectionThickness={0.005}
      sectionColor="#9d4b4b"
      fadeDistance={30}
      fadeStrength={1}
      infiniteGrid
      followCamera={false}
      axes
      xAxisColor="#ff5555"
      zAxisColor="#5555ff"
      axisThickness={1.5}
      height={-0.01}
      size={200}
      cellThickness={0.5}
    />
  );
}
