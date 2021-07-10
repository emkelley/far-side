<template>
  <div id="home">
    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <h1
          class="navbar-item"
          style="
            color: ghostwhite;
            font-family: 'Turret Road', cursive;
            font-size: 1.5rem;
          "
        >
          FAR SIDE <span class="latin" style="margin-left: 0.5rem">α</span>
        </h1>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <a class="navbar-item"> About </a>
          <a class="navbar-item"> Help </a>
          <a class="navbar-item"> Item Glossary </a>
        </div>
      </div>
    </nav>
    <Game />
  </div>
</template>

<script>
// @ is an alias to /src
import Game from '@/views/Game.vue';

export default {
  name: 'Home',
  components: { Game },
};
</script>

<style lang="scss" scoped>
#home {
  min-height: 100vh;
  background: #dce2ff;
  padding: 0;
  margin: 0;
}
.title,
.subtitle {
  text-align: center !important;
  color: ghostwhite;
}
.hero {
  height: 200px;
}
</style>
