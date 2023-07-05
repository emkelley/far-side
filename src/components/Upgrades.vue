<script setup lang="ts">
import upgrades from "@/data/upgrades";
import { useUpgradesStore } from "@/stores/upgrades.store";

const upgradesStore = useUpgradesStore();
</script>

<template>
  <section class="mt-8">
    <h2 class="text-2xl font-bold mb-4">Upgrades</h2>
    <div v-for="(upgrade, index) in upgrades" :key="index" class="mb-4">
      <button
        class="bg-emerald-500 text-white px-4 py-2 rounded-lg disabled:opacity-40"
        :disabled="upgradesStore.canPurchaseItem(upgrade)"
      >
        Buy {{ upgrade.name }}
      </button>
    </div>
  </section>
</template>

<style scoped></style>
