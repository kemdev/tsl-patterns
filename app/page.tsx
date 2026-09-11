/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";
import Experience from "@/components/three/Experience";
import Gallery from "@/components/ui/Gallery";

export default function Home() {
  return (
    <div className="flex flex-col flex-1  font-sans h-full ">
      <main className="flex flex-1 w-full h-screen! flex-col sm:items-start">
        <Gallery />
        <Experience />
      </main>
    </div>
  );
}
