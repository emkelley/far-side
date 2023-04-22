<script setup lang="ts">
import { ref } from "vue";
import { useGameStore } from "@/stores/game.store";
import TopNav from "@/components/global/TopNav.vue";
import BottomBar from "@/components/global/BottomBar.vue";
import InventoryPanel from "@/components/global/InventoryPanel.vue";
import Game from "@/components/Game.vue";
const gameStore = useGameStore();

const inventory_panel = ref<HTMLElement | null>(null);

const inventory_expanded = ref(true);

const toggleInventorySize = () => {
  if (inventory_panel.value) {
    if (inventory_panel.value.classList.contains("w-[30rem]")) {
      inventory_panel.value.classList.remove("w-[30rem]");
      inventory_panel.value.classList.add("w-64");
      inventory_expanded.value = false;
    } else {
      inventory_panel.value.classList.remove("w-56");
      inventory_panel.value.classList.add("w-[30rem]");
      inventory_expanded.value = true;
    }
  }
};
</script>

<template>
  <main
    class="flex flex-col w-screen h-screen max-h-screen overflow-y-scroll text-slate-100"
  >
    <div id="uiTopBar" class="w-full">
      <TopNav />
    </div>
    <section id="uiContentWrapper" class="grow w-full flex">
      <div
        ref="inventory_panel"
        id="uiContentLeft"
        class="left w-[30rem] transition-all duration-500 ease-in-out relative"
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
        <InventoryPanel :expanded="inventory_expanded" />
      </div>
      <div
        id="uiContentMain"
        class="flex-grow bg-slate-950 flex flex-col text-slate-200"
      >
        <Game />
      </div>
      <div id="uiContentRight" class="right w-48 bg-slate-800">right</div>
    </section>
    <!-- <div id="uiBottomPanel" class="w-full">bottombar</div> -->
    <div id="uiBottomBar" class="w-full">
      <BottomBar />
    </div>
  </main>
</template>
