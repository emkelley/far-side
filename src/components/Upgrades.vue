<script setup lang="ts">
import { usePlayerStore } from "@/stores/player.store";
import { reactive } from "vue";
import upgrades from "@/data/upgrades";

const playerStore = usePlayerStore();
</script>
<template>
  <section class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Upgrades</h2>
    <div v-for="(upgrade, index) in upgrades" :key="index" class="mb-4">
      <button class="bg-emerald-500 text-white px-4 py-2 rounded-lg">
        Buy {{ upgrade.name }} ({{ upgrade.cost }} clicks)
      </button>
    </div>
  </section>
</template>

<style scoped></style>
