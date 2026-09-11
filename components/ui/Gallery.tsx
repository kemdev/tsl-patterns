/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

"use client";
import useSelectedPatternStore from "@/stores/selectedPattern";
import { patterns } from "@/util/images";
import Image from "next/image";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
export default function Gallery() {
  const { selectedPattern, setSelectedPattern } = useSelectedPatternStore();

  const [hide, setHide] = useState<boolean>(true);

  return (
    <div
      className={`fixed bottom-0 z-10 w-full ${hide ? "h-16" : "h-100"} transform transition-all duration-400 ease-in-out`}
    >
      <div
        className={`flex justify-center  p-5  w-fit mx-auto rounded-2xl rounded-b-none cursor-pointer transition-transform duration-200 hover:scale-110 shadow shadow-neutral-800 ${hide ? "bg-[#9D4B4B]" : "bg-neutral-900"}`}
        onClick={() => setHide(!hide)}
      >
        <FaArrowUp
          size={32}
          color="white"
          className={`transform transition-transform duration-700 ${hide ? "rotate-0" : "rotate-180"}`}
        />
      </div>

      <div
        className={`grid grid-cols-4 grid-rows-subgrid gap-4 p-4 bg-neutral-900 overflow-y-auto max-h-100 justify-items-center shadow-inner shadow-neutral-800 `}
      >
        {patterns.map((pattern, index) => (
          <div
            key={index}
            className={`col-span-1 row-span-1 cursor-pointer hover:opacity-75 hover:bg-neutral-800 p-1 ${selectedPattern === pattern.id ? "border-2 border-blue-500" : ""}`}
            onClick={() => setSelectedPattern(pattern.id)}
          >
            <Image
              src={pattern.image}
              alt={pattern.id + ""}
              width={500}
              height={500}
              className="w-50 h-50"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
