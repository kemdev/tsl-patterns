/*
 * Generated or edited with ChatGPT.
 * Reference chat: https://chatgpt.com/share/6aa43d9a-d1b0-83eb-8cbb-49a54066e77e
 */

// Store for the selected pattern ID using zustand
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface SelectedPatternState {
  selectedPattern: number;
  setSelectedPattern: (index: number) => void;
}

const useSelectedPatternStore = create<SelectedPatternState>()(
  devtools(
    persist(
      (set) => ({
        selectedPattern: 1,
        setSelectedPattern: (index) => set({ selectedPattern: index }),
      }),
      {
        name: "selected-pattern-storage",
      },
    ),
  ),
);

export default useSelectedPatternStore;
