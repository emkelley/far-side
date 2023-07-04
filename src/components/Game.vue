<script setup lang="ts">
import { attemptMining } from "@/core/farside";
import { ref, reactive, onMounted } from "vue";

const clicks = ref(0);
let clickMultiplier = ref(1);

const incrementClicks = () => {
  clicks.value += clickMultiplier.value;
};

const upgrades = reactive([
  { name: "Double clicks", cost: 10, multiplier: 2 },
  { name: "Triple clicks", cost: 25, multiplier: 3 },
  { name: "Quadruple clicks", cost: 50, multiplier: 4 },
]);

const buyUpgrade = (index: number) => {
  if (clicks.value >= upgrades[index].cost) {
    clicks.value -= upgrades[index].cost;
    clickMultiplier.value = upgrades[index].multiplier;
  }
};

const shopItems = reactive([
  { name: "Worker", cost: 50, pointsPerSecond: 1, count: 0 },
]);

const buyShopItem = (index: number) => {
  if (clicks.value >= shopItems[index].cost) {
    clicks.value -= shopItems[index].cost;
    shopItems[index].count++;
  }
};

const beginMiningAdventure = () => {
  console.log("beginning mining adventure");
  console.log(attemptMining(0, true));
};
onMounted(() => {
  setInterval(() => {
    clicks.value += shopItems[0].count * shopItems[0].pointsPerSecond;
  }, 1000);
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-4">Actions</h1>
    <div class="bg-gray-900 p-4 rounded-lg">
      <div class="text-2xl mb-4">Clicks: {{ clicks }}</div>
      <div class="flex gap-3 items-center font-bold">
        <button
          @click="incrementClicks"
          class="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Mine
        </button>
        <button
          @click="beginMiningAdventure"
          class="bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Go on a Mining Expedition
        </button>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Upgrades</h2>
      <div v-for="(upgrade, index) in upgrades" :key="index" class="mb-4">
        <button
          @click="buyUpgrade(index)"
          :disabled="clicks < upgrade.cost"
          class="bg-emerald-500 text-white px-4 py-2 rounded-lg"
        >
          Buy {{ upgrade.name }} ({{ upgrade.cost }} clicks)
        </button>
      </div>
    </div>
    <div class="mt-8">
      <h2 class="text-2xl font-bold mb-4">Shop</h2>
      <div v-for="(item, index) in shopItems" :key="index" class="mb-4">
        <button
          @click="buyShopItem(index)"
          :disabled="clicks < item.cost"
          class="bg-yellow-500 text-white px-4 py-2 rounded-lg"
        >
          Hire {{ item.name }} ({{ item.cost }} clicks)
        </button>
      </div>
    </div>
  </div>
</template>
