<template>
  <div
    @click="emits('toggle:inventory')"
    class="p-4 pr-8 pl-12 absolute top-0 right-0 cursor-pointer text-white text-lg flex items-center justify-center"
  >
    <CaretLeft v-show="inventory_expanded" />
    <CaretRight v-show="!inventory_expanded" />
  </div>
</template>

<script setup lang="ts">
import CaretLeft from "@/components/icons/CaretLeft.vue";
import CaretRight from "@/components/icons/CaretRight.vue";
defineProps({
  inventory_expanded: Boolean,
});
const emits = defineEmits(["toggle:inventory"]);
</script>

<style scoped></style>
