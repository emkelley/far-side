<script setup lang="ts">
import items_resources from "@/data/resources";
import items_tools from "@/data/tools";
import { usePlayerStore } from "@/stores/player.store";
import { Icon } from "@iconify/vue";
import { storeToRefs } from "pinia";
import { toast } from "vue3-toastify";

const playerStore = usePlayerStore();
const { inventory } = storeToRefs(playerStore);

const props = defineProps<{
  expanded: boolean;
}>();

const handleItemClick = (item: string) => {
  toast(`Clicked on ${item}`, { position: toast.POSITION.TOP_RIGHT });
};
</script>

<template>
  <section class="flex flex-col gap-4 h-full">
    <div class="flex flex-col gap-4">
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
          <p class="select-none">
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="flex flex-col gap-4 grow h-96 overflow-y-scroll overflow-x-hidden"
    >
      <h1 class="text-xl font-black tracking-wider text-center text-slate-300">
        DEV - All Items
      </h1>
      <div
        ref="itemsGrid"
        class="grid gap-3"
        :class="props.expanded ? 'grid-cols-2' : 'grid-cols-1'"
      >
        <div
          @click="handleItemClick(tool.name)"
          v-for="tool in [...items_tools, ...items_resources]"
          class="bg-slate-900 hover:bg-slate-700 transition-all rounded-lg shadow-md h-[65px] mb-1 flex items-center justify-center relative text-center gap-3 cursor-pointer"
        >
          <Icon v-if="tool.icon" :icon="tool.icon" width="24" />
          <p class="select-none">
            {{ tool.name }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
