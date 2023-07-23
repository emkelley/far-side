<script setup lang="ts">
import { useGameStore } from "@/stores/game.store";
import { storeToRefs } from "pinia";
import { relativeTime } from "@/utils";

const { event_log } = storeToRefs(useGameStore());
</script>

<template>
  <h1 class="text-xl">Events Log</h1>
  <div class="flex flex-col gap-2 max-h-96 overflow-y-scroll">
    <div
      v-for="event in event_log"
      :key="event.id"
      class="flex gap-2 items-center"
    >
      <p>{{ relativeTime(event.timestamp) }}</p>
      {{ event.event }}
    </div>
  </div>
</template>

<style scoped></style>
