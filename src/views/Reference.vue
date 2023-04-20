<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import items_tools from "@/data/tools";
import { Icon } from "@iconify/vue";
</script>

<template>
  <Navbar />
  <div
    class="bg-gradient-to-b from-slate-100 via-slate-100 to-transparent text-slate-950 w-full px-6 py-8 min-h-[700px] flex flex-col gap-3"
  >
    <div class="container mx-auto px-4 py-16">
      <h1 class="text-4xl font-bold mb-8">Field Guide</h1>
      <h1 class="text-2xl font-bold mb-8">Tools</h1>
      <div class="flex gap-3">
        <div class="grid grid-cols-8">
          <div
            v-for="tool in items_tools"
            class="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col items-center justify-center relative text-center"
          >
            <Icon v-if="tool.icon" :icon="tool.icon" width="36" />
            <p class="text-lg">
              {{ tool.name }}
            </p>
          </div>
        </div>
        <div class="border p-8"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
