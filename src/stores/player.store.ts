import { GameItem, InventoryItem } from "@/types/Item";
import { PlayerStats } from "@/types/Player";
import { defineStore } from "pinia";
import { useItemsStore } from "./items.store";
import { attemptMining } from "@/core/farside";
export const usePlayerStore = defineStore("player", {
  state: () => {
    return {
      inventory: [] as InventoryItem[],
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
  actions: {
    addToInventory(item_id: number, quantity: number): void {
      const inventoryItem = this.inventory.find((item) => item.id === item_id);
      const item = useItemsStore().getItemDetail(item_id);
      if (inventoryItem) inventoryItem.quantity += quantity;
      else this.inventory.push({ ...item, quantity: quantity });
    },
    mine(difficulty: number) {
      const { resources } = useItemsStore();
      const miningIsSuccessful = attemptMining(difficulty);
      if (!miningIsSuccessful) {
        console.log("Mining was unsuccessful.");
        return "Mining was unsuccessful.";
      }

      // Mining was successful, add 1 stone and a 20% chance of 1 coal and 10% change of 1.
      const stone = resources.find((item) => item.machine_name === "stone")!;
      const coal = resources.find((item) => item.machine_name === "coal")!;
      const iron = resources.find((item) => item.machine_name === "iron_ore")!;

      const coalRoll = Math.floor(Math.random() * 100) + 1;
      const ironRoll = Math.floor(Math.random() * 100) + 1;

      // Add stone to inventory
      this.addToInventory(stone.id, 1);

      // Add coal to inventory
      if (coalRoll <= 20) {
        this.addToInventory(coal.id, 1);
      }

      // Add iron to inventory
      if (ironRoll <= 10) {
        this.addToInventory(iron.id, 1);
      }
      console.log(`Mining was successful. You found 1 stone, ${
        coalRoll <= 20 ? "1 coal, " : ""
      }${ironRoll <= 10 ? "1 iron ore, " : ""}
        `);

      return `Mining was successful. You found 1 stone, ${
        coalRoll <= 20 ? "1 coal, " : ""
      }${ironRoll <= 10 ? "1 iron ore, " : ""}
        `;
    },
    purchaseItem(gameItem: GameItem): void {
      // Loop through each recipe item
      for (let recipeItem of gameItem.recipe!) {
        // Find corresponding inventory item
        let inventoryItem = this.inventory.find(
          (item) => item.id === recipeItem.id
        );

        // Get recipe item details
        const recipeItemDetail = useItemsStore().getItemDetail(recipeItem.id);

        // If item not found in inventory or not enough quantity, return error
        if (!inventoryItem || inventoryItem.quantity < recipeItem.quantity) {
          console.log(
            `You do not have enough ${recipeItemDetail.name} to purchase ${gameItem.name}`
          );
        }
      }

      // If we've made it here, the user has enough items to purchase the game item
      // Subtract recipe items from inventory
      let newInventory = this.inventory.map((inventoryItem) => {
        let recipeItem = gameItem.recipe!.find(
          (item) => item.id === inventoryItem.id
        );

        if (recipeItem) {
          // Subtract the quantity used in the recipe
          return {
            ...inventoryItem,
            quantity: inventoryItem.quantity - recipeItem.quantity,
          };
        } else {
          // Item not used in recipe, return unchanged
          return inventoryItem;
        }
      });

      // Add purchased item to the inventory
      newInventory.push({
        ...gameItem,
        quantity: 1,
      });

      this.inventory = newInventory;
      console.log(`You have successfully purchased ${gameItem.name}`);
    },
  },
});
