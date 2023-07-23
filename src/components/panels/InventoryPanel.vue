<script setup lang="ts">
import { useItemsStore } from "@/stores/items.store";
import { usePlayerStore } from "@/stores/player.store";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";
import DevItemsPanel from "../dev/DevItemsPanel.vue";
import EventsPanel from "./EventsPanel.vue";

const playerStore = usePlayerStore();
const itemsStore = useItemsStore();
const { inventory } = storeToRefs(playerStore);

const props = defineProps<{
  expanded: boolean;
}>();

const handleItemClick = (item: string) => {
  toast(`Clicked on ${item}`, { position: toast.POSITION.TOP_RIGHT });
};
</script>

<template>
  <section class="flex flex-col gap-4 overflow-y-scroll pb-48">
    <div class="flex flex-col gap-4 mb-12">
      <h1 class="text-xl">Inventory</h1>
      <div
        ref="itemsGrid"
        class="grid gap-3"
        :class="props.expanded ? 'grid-cols-2' : 'grid-cols-1'"
      >
        <div
          v-if="inventory.length === 0"
          class="text-center w-full my-8"
          :class="props.expanded ? 'col-span-2' : 'col-span-1'"
        >
          <p>~no inventory~</p>
        </div>
        <div
          @click="handleItemClick(item.name)"
          v-for="item in inventory"
          class="bg-slate-900 hover:bg-slate-700 transition-all rounded-lg shadow-md h-[65px] mb-1 flex items-center justify-center relative text-center gap-3 cursor-pointer"
        >
          <Icon v-if="item.icon" :icon="item.icon" width="24" />
          <p class="select-none">{{ item.name }} ({{ item.quantity }})</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
