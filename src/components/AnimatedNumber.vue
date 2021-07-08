<template>
  <p>{{ numberWithCommas(displayNumber) }} / {{ numberWithCommas(cap) }}</p>
</template>

<script>
export default {
  props: {
    number: { default: 0 },
    cap: { default: 100 },
  },
  data() {
    return {
      displayNumber: 0,
      interval: false,
    };
  },
  mounted() {
    this.displayNumber = this.number ? this.number : 0;
  },
  watch: {
    number() {
      clearInterval(this.interval);
      if (this.number == this.displayNumber) return;
      this.interval = window.setInterval(() => {
        if (this.displayNumber != this.number) {
          var change = (this.number - this.displayNumber) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayNumber = this.displayNumber + change;
        }
      }, 50);
    },
  },
  methods: {
    numberWithCommas(x) {
      return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style lang="sass" scoped></style>
