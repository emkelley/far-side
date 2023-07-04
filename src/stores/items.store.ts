import { GameItem } from "@/types/GameItem";
import { defineStore } from "pinia";
import items_resources from "@/data/resources";
import items_tools from "@/data/tools";

export const useItemsStore = defineStore("items", {
  state: () => {
    return {
      tools: items_resources as GameItem[],
      resources: items_tools as GameItem[],
    };
  },
});
