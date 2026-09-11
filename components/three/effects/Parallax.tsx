/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

import { useTexture } from "@react-three/drei";
import { Vector3 } from "three/webgpu";
import {
  color,
  float,
  mix,
  mx_worley_noise_float,
  parallaxUV,
  texture,
  time,
  uv,
  vec2,
  vec3,
} from "three/tsl";

export default function GlassParallax({
  image,
  position,
}: {
  image: string;
  position?: Vector3;
}) {
  const map = useTexture(image);

  // Slightly zoom into the image so UV distortion
  // has some room before hitting the texture borders.
  const baseUv = uv().sub(0.5).mul(0.9).add(0.5);

  // View-based parallax
  const depthUv = parallaxUV(baseUv, vec2(0.025, 0.025)) as ReturnType<
    typeof uv
  >;

  // --------------------------------
  // Glass distortion pattern
  // --------------------------------

  const glassInput = vec3(depthUv.xy.mul(2), time.mul(0.08));

  const glassNoise = mx_worley_noise_float(glassInput);

  // Convert the scalar noise into an offset.
  // Centering around 0.5 gives us +/- movement.
  const distortion = glassNoise.sub(0.5).mul(0.01);

  const distortedUv = depthUv.add(vec2(distortion, distortion.mul(0.65)));

  const imageColor = texture(map);

  // --------------------------------
  // Glass highlights
  // --------------------------------

  const highlightNoise = glassNoise.pow(6);

  const glassHighlight = mix(color(0x91c8ff), color(0xffffff), highlightNoise);

  // Keep the highlight subtle
  const finalColor = mix(imageColor, glassHighlight, highlightNoise.mul(1.18));

  return (
    <mesh
      position={position}
      scale={[0.9, 0.9, 1]}
    >
      <planeGeometry args={[1, 1]} />

      <meshBasicNodeMaterial
        colorNode={finalColor}
        needsUpdate
      />
    </mesh>
  );
}
