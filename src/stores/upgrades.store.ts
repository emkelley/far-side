import { GameItem, RecipeEntity } from "@/types/Item";
import { defineStore } from "pinia";
import items_resources from "@/data/resources";
import items_tools from "@/data/tools";
import { useItemsStore } from "./items.store";
import { usePlayerStore } from "./player.store";

export const useUpgradesStore = defineStore("upgrades", {
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
    canPurchaseItem(gameItem: GameItem): boolean {
      const { inventory } = usePlayerStore();
      // Loop through each recipe item
      for (let recipeItem of gameItem.recipe!) {
        // Find corresponding inventory item
        let inventoryItem = inventory.find((item) => item.id === recipeItem.id);

        // If item not found in inventory or not enough quantity, return error
        if (!inventoryItem || inventoryItem.quantity < recipeItem.quantity) {
          return false;
        }
      }

      return true;
    },
  },
});
