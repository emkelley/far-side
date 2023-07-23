<script setup lang="ts">
import { onMounted, ref } from "vue";
import TopNav from "@/components/global/TopNav.vue";
import BottomBar from "@/components/global/BottomBar.vue";
import Game from "@/components/Game.vue";
import Lore from "@/components/Lore.vue";
import LeftPanelWrapper from "@/components/global/LeftPanelWrapper.vue";

const lore_pane_visible = ref(false);

onMounted(() => {});
</script>

<template>
  <main class="flex flex-col w-screen h-screen text-slate-100 overflow-hidden">
    <div id="uiTopBar" class="w-full">
      <TopNav @toggle:lore="lore_pane_visible = !lore_pane_visible" />
    </div>
    <section
      id="uiContentWrapper"
      class="grow w-full flex bg-slate-800 text-slate-50"
    >
      <LeftPanelWrapper />
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
