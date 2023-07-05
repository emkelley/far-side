import { GameItem } from "@/types/Item";
import { defineStore } from "pinia";
import items_resources from "@/data/resources";
import items_tools from "@/data/tools";

export const useItemsStore = defineStore("items", {
  state: () => {
    return {
      tools: items_tools as GameItem[],
      resources: items_resources as GameItem[],
    };
  },
  actions: {
    getItemDetail(item_id: number): GameItem {
      const { tools, resources } = useItemsStore();
      const item = tools.find((item) => item.id === item_id);
      if (item) {
        return item;
      }
      return resources.find((item) => item.id === item_id)!;
    },
  },
});
