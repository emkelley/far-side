<script setup lang="ts">
import { onMounted, ref } from "vue";
import InventoryPanel from "@/components/panels/InventoryPanel.vue";
import EventsPanel from "@/components/panels/EventsPanel.vue";
import DevItemsPanel from "@/components/panels/DevItemsPanel.vue";
import PartyPanel from "@/components/panels/PartyPanel.vue";
import InventoryToggle from "./InventoryToggle.vue";

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
</script>

<template>
  <div
    ref="inventory_panel"
    id="uiContentLeft"
    class="left w-[30rem] transition-all duration-500 ease-in-out relative p-4"
  >
    <InventoryToggle
      @toggle:inventory="toggleInventorySize"
      :inventory_expanded="inventory_expanded"
    />
    <PartyPanel />
    <InventoryPanel :expanded="inventory_expanded" />
    <DevItemsPanel :expanded="inventory_expanded" />
    <EventsPanel />
  </div>
</template>

<style scoped></style>
