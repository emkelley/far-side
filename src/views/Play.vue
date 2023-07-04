<script setup lang="ts">
import { onMounted, ref } from "vue";
import TopNav from "@/components/global/TopNav.vue";
import BottomBar from "@/components/global/BottomBar.vue";
import InventoryPanel from "@/components/global/InventoryPanel.vue";
import Game from "@/components/Game.vue";
import Lore from "@/components/Lore.vue";

const inventory_panel = ref<HTMLElement | null>(null);
const lore_pane_visible = ref(false);
const inventory_expanded = ref(true);

const toggleInventorySize = () => {
  if (!inventory_panel.value) return;

  if (inventory_panel.value.classList.contains("w-[30rem]")) {
    inventory_panel.value.classList.remove("w-[30rem]");
    inventory_panel.value.classList.add("w-64");
    inventory_expanded.value = false;
  } else {
    inventory_panel.value.classList.remove("w-56");
    inventory_panel.value.classList.add("w-[30rem]");
    inventory_expanded.value = true;
  }
};

onMounted(() => {});
</script>

<template>
  <main
    class="flex flex-col w-screen h-screen max-h-screen overflow-y-scroll text-slate-100"
  >
    <div id="uiTopBar" class="w-full">
      <TopNav @toggle:lore="lore_pane_visible = !lore_pane_visible" />
    </div>
    <section
      id="uiContentWrapper"
      class="grow w-full flex bg-slate-800 text-slate-50"
    >
      <div
        ref="inventory_panel"
        id="uiContentLeft"
        class="left w-[30rem] transition-all duration-500 ease-in-out relative p-4"
      >
        <div
          @click="toggleInventorySize()"
          class="p-4 pr-8 absolute top-0 right-0 cursor-pointer text-white text-lg flex items-center justify-center"
        >
          <i
            v-show="inventory_expanded"
            class="fa-solid fa-caret-left"
            title="collapse"
          ></i>
          <i
            v-show="!inventory_expanded"
            class="fa-solid fa-caret-right"
            title="expand"
          ></i>
        </div>
        <section class="flex flex-col gap-3">
          <h2 class="text-lg">Party</h2>
        </section>
        <InventoryPanel :expanded="inventory_expanded" />
      </div>
      <div
        id="uiContentMain"
        class="flex-grow bg-slate-950 flex flex-col text-slate-200"
      >
        <Game />
      </div>
      <div
        id="uiContentRight"
        class="right bg-slate-800 duration-300"
        :class="lore_pane_visible ? 'w-96' : 'w-0'"
      >
        <Lore></Lore>
      </div>
    </section>
    <div id="uiBottomBar" class="">
      <BottomBar />
    </div>
  </main>
</template>
