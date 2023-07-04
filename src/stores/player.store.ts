import { GameItem } from "@/types/GameItem";
import { PlayerStats } from "@/types/Player";
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      inventory: [] as GameItem[],
      stats: {
        level: 5,
        exp: 0,
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
