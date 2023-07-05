<script setup lang="ts">
import { attemptMining } from "@/core/farside";
import { ref, reactive, onMounted } from "vue";
import { toast } from "vue3-toastify";
import Upgrades from "./Upgrades.vue";
import { usePlayerStore } from "@/stores/player.store";

const clicks = ref(0);
let clickMultiplier = ref(1);
const playerStore = usePlayerStore();

const handleMineClick = () => {
  playerStore.mine(0);
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
  fireToast("beginning mining adventure");
  setTimeout(() => {
    fireToast(`Adventure complete!`);
    fireToast(attemptMining(0, true) ? "Success!" : "Failure!");
  }, 5000);
};

const fireToast = (text: string) => {
  toast(text, { position: toast.POSITION.TOP_RIGHT });
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
          @click="handleMineClick"
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
    <Upgrades />
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
