<script setup lang="ts"></script>

<template>
  <nav class="flex w-full justify-between shadow-md">
    <div class="h-12 flex items-center px-8">
      <router-link to="/">Farside - Alpha</router-link>
    </div>
    <div class="h-12 flex items-center px-8 gap-4 font-bold">
      <router-link to="/lore">Lore</router-link>
      <router-link to="/reference">Reference</router-link>
      <router-link to="/play">Play</router-link>
    </div>
  </nav>
</template>

<style scoped></style>
