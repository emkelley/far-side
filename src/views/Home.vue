<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title is-1">FAR SIDE</p>
        <p class="subtitle">
          An idle clicker game with a story of dubious quality
        </p>
        <br />
        <router-link to="/game" class="button is-large is-primary">
          Play
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
</script>

<style lang="scss" scoped>
.title,
.subtitle {
  text-align: center !important;
  color: ghostwhite;
}
.hero {
  background: #181c2e;
}
</style>
