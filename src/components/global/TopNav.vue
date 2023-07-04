<script setup lang="ts">
const emits = defineEmits(["toggle:lore"]);
</script>

<template>
  <nav
    class="flex w-full justify-between shadow-md bg-slate-900 text-slate-50 py-4"
  >
    <div class="flex items-center px-8">
      <router-link to="/" class="text-3xl">Farside - Alpha</router-link>
    </div>
    <div
      class="flex items-center px-8 gap-4 font-bold tracking-wide select-none"
    >
      <p @click="emits('toggle:lore')" class="hover:cursor-pointer">Lore</p>
      <router-link to="/reference">Reference</router-link>
      <router-link to="/play">Play</router-link>
    </div>
  </nav>
</template>

<style scoped></style>
