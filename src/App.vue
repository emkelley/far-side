<template>
  <div id="app">
    <ControlPanel />
    <router-view />
  </div>
</template>
<script>
import ControlPanel from '@/components/ControlPanel.vue';

export default {
  name: 'Home',
  components: {
    ControlPanel,
  },
};
</script>
<style lang="scss">
#app {
  overflow: none;
  font-family: 'IBM Plex Sans', sans-serif !important;
}
.title,
.subtitle {
  color: ghostwhite;
  font-family: 'Turret Road', cursive;
}
::-webkit-scrollbar {
  display: none;
}
</style>
