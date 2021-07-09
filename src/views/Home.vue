<template>
  <div id="home" class="columns is-vcentered is-centered">
    <div class="column is-half">
      <p class="title is-1">FAR SIDE</p>
      <p class="subtitle">
        An idle clicker game with a story of dubious quality
      </p>
      <br />
      <center>
        <router-link to="/game" class="button is-large is-primary">
          Play
        </router-link>
      </center>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
};
</script>

<style lang="scss" scoped>
#home {
  min-height: 100vh;
  background: #181c2e;
  padding: 0;
  margin: 0;
}
.title,
.subtitle {
  text-align: center !important;
  color: ghostwhite;
}
.hero {
  background: #181c2e;
}
</style>
