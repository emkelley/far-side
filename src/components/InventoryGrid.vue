<template>
  <div v-if="inventory" id="inventory-grid" class="content">
    <article
      v-for="resource in inventory"
      :key="resource.id"
      class="grid-item"
      :class="{ 'is-core-tool': isCoreTool(resource.id) }"
    >
      <div class="grid-item-content">
        <div class="icon-box">
          <span>{{ resource.displayName.charAt(0) }}</span>
        </div>
        <p class="has-text-centered" style="font-size: 0.75rem; color: white">
          {{ resource.amount }} <br />
          {{ resource.displayName }}
        </p>
      </div>
    </article>
  </div>
</template>
<script>
import { gameItems } from '@/data/items';
import { mapState } from 'vuex';
export default {
  name: 'InventoryGrid',
  components: {},
  computed: {
    ...mapState(['inventory']),
    coreTools() {
      return gameItems.filter((e) => e.type === 'core-tool');
    },
  },
  methods: {
    isCoreTool(id) {
      return this.coreTools.find((t) => t.id === id) ? true : false;
    },
  },
};
</script>
<style lang="scss" scoped>
#inventory-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(70px, 1fr));
  grid-gap: 1rem;
  .grid-item {
    background: rgb(13, 0, 34);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
    .icon-box {
      background: #492977;
      width: 25px;
      height: 25px;
      text-align: center;
      border-radius: 4px;
      font-weight: bold;
    }
    p {
      margin-top: 0.5rem;
    }
    .grid-item-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
