<template>
  <b-modal v-model="isImageModalActive">
    <div class="box">
      <GlobalNavigation />
      <h1 class="title">Control Panel</h1>
      <hr />
      <p>A text adventure</p>
      <p>
        U got to the moon. moons haunted. Try to get off the moon and back home.
      </p>
      <hr />

      <p>make gameplay ticker to get wood automatically</p>
      <p>hire workers (different jobs too?)</p>
      <p>unlock crafting benches</p>
      <p>unlock buildings for storage</p>
      <p>research system</p>
      <p>science system</p>
      <p>visible log of actions</p>
      <p>events??</p>
    </div>
  </b-modal>
</template>

<script>
import GlobalNavigation from '@/components/GlobalNavigation.vue';
export default {
  components: {
    GlobalNavigation,
  },
  data() {
    return {
      isImageModalActive: false,
    };
  },
  mounted() {
    this._keyListener = function (e) {
      if (e.key === 'e' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.isImageModalActive = !this.isImageModalActive;
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
