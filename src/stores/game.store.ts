import { GameEvent } from "@/types/Game";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      event_log: [] as GameEvent[],
    };
  },
});
