<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item"> Home </router-link>
          <router-link to="/landing" class="navbar-item">
            Landing Page
          </router-link>
          <router-link to="/game" class="navbar-item"> Play Game </router-link>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light"> Log in </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  mounted() {
    this._keyListener = function (e) {
      if (e.key === 'n' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.navIsActive = !this.navIsActive;
      }
    };

    document.addEventListener('keydown', this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this._keyListener);
  },
};
</script>

<style lang="scss" scoped></style>
