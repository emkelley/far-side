import { GameItem } from "@/types/GameItem";
import { PlayerStats } from "@/types/Player";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      tools: [] as GameItem[],
      resources: [] as GameItem[],
      inventory: [] as GameItem[],
      player: {
        strength: 1,
        agility: 1,
        vigor: 1,
        vitality: 1,
        intelligence: 1,
        endurance: 1,
        dexterity: 1,
      } as PlayerStats,
    };
  },
});
