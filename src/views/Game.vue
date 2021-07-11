<template>
  <main>
    <vuescroll>
      <div id="game" class="grid">
        <div class="inventory">
          <div v-if="inventory" class="">
            <h1 class="title has-text-centered is-5">Inventory</h1>
            <div
              v-for="resource in invSortedByID"
              :key="resource.id"
              style="margin-bottom: 0.75rem"
              :class="{ 'is-core-tool': getInvItemCap(resource.id) === 1 }"
            >
              <div class="level">
                <div class="level-left">
                  <strong class="level-item">{{ resource.displayName }}</strong>
                </div>
                <div class="level-right">
                  <span
                    v-if="resource.id === 2001 && activeWorkers"
                    class="current-output"
                  >
                    +{{ activeWorkers }}/tick
                  </span>
                  <animated-counter
                    class="level-item"
                    :number="resource.amount"
                    :cap="getInvItemCap(resource.id)"
                  ></animated-counter>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div v-if="devEnvironment" id="dev-panel">
            <h1 class="title has-text-centered is-5" style="color: red">
              DEV GIVE ITEM
            </h1>
            <div class="dev-wrapper">
              <b-field>
                <b-select
                  expanded
                  placeholder="Select an Item"
                  v-model="devAddItemID"
                >
                  <option
                    v-for="item in gameItems"
                    :key="item.id"
                    :value="item.id"
                  >
                    > {{ item.displayName }}
                  </option>
                </b-select>
              </b-field>
              <b-field>
                <b-input
                  v-model="devAddItemAmount"
                  number
                  placeholder="50"
                ></b-input>
              </b-field>
              <b-button @click="devAdd" type="is-primary" expanded>
                Add items to inventory
              </b-button>
            </div>
          </div>
        </div>
        <div class="inventory-footer">
          <p>
            <span>FAR SIDE</span> a game by
            <a href="https://emk.dev">Eric Kelley</a>
          </p>
        </div>
        <div class="game-wrapper">
          <div class="inner-wrapper">
            <br />
            <section class="resources">
              <h1 class="title is-5">Gather Resources</h1>
              <div v-if="earthResources" class="buttons">
                <button
                  v-for="resource in earthResources"
                  :key="resource.id"
                  class="button is-small is-primary"
                  @click="craft(resource)"
                  :disabled="haveEnoughFor(resource.id)"
                >
                  {{ resource.displayName }}
                </button>
              </div>
            </section>
            <hr />
            <section class="tools">
              <h1 class="title is-5">Build Tools</h1>
              <div v-if="tools" class="buttons">
                <button
                  v-if="!hasWorkbench"
                  class="button is-small is-primary"
                  @click="craft(1001)"
                  :disabled="haveEnoughFor(1001)"
                >
                  Build a Workbench
                </button>
                <button
                  v-else
                  v-for="resource in tools"
                  :key="resource.id"
                  class="button is-small is-primary"
                  @click="craft(resource)"
                  :disabled="hasWorkbench && haveEnoughFor(resource.id)"
                >
                  {{ resource.displayName }}
                </button>
              </div>
            </section>
            <hr />
            <section class="workers">
              <h1 class="title is-5">Hire Workers</h1>
              <div class="buttons">
                <button
                  v-for="worker in workers"
                  :key="worker.id"
                  class="button is-small is-primary"
                  @click="craft(worker)"
                  :disabled="haveEnoughFor(worker.id)"
                >
                  {{ worker.displayName }}
                </button>
              </div>
            </section>
            <hr />
            <section class="logs">
              <h1 class="title is-5">Logs</h1>
              <div class="wrapper">
                <vuescroll>
                  <p v-for="(action, index) in actionLog" :key="index">
                    {{ action }}
                  </p>
                </vuescroll>
              </div>
            </section>
            <hr />
            <section class="logs">
              <h1 class="title is-5">DEV</h1>
              <div class="wrapper">
                {{ player }}
              </div>
            </section>
            <hr />
          </div>
        </div>
        <div
          class="game-footer"
          style="font-family: 'IBM Plex Mono'; color: MediumSlateBlue"
        >
          <p>Game Tickrate: {{ gameTickrate }}ms - Current Tick: {{ tick }}</p>
        </div>
      </div>
    </vuescroll>
  </main>
</template>

<script>
import vuescroll from 'vuescroll';
import AnimatedCounter from '@/components/AnimatedNumber';
import { gameItems } from '@/data/items';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      gametime: '',
      tick: 0,
      devAddItemID: undefined,
      devAddItemAmount: 1,
      gameItems,
    };
  },
  components: { AnimatedCounter, vuescroll },
  computed: {
    devEnvironment() {
      if (window.location.hostname === 'localhost') return true;
      else return false;
    },
    ...mapState(['player', 'inventory', 'workers', 'actionLog']),
    gameTickrate() {
      return process.env.VUE_APP_TICKRATE;
    },
    earthResources() {
      return this.filterGameItemsByType('earth-resource');
    },
    coreTools() {
      return this.filterGameItemsByType('core-tool');
    },
    tools() {
      return this.filterGameItemsByType('tool');
    },
    workers() {
      return this.filterGameItemsByType('worker');
    },
    machines() {
      return this.filterGameItemsByType('machine');
    },
    activeWorkers() {
      return this.getInvItemByID(4001).amount || 0;
    },
    hasWorkbench() {
      return this.getInvItemByName('workbench') ? true : false;
    },
    invSortedByID() {
      return this.sortInv();
    },
  },
  mounted() {
    this.gameTick();
  },
  methods: {
    gameTick() {
      this.gametime = setInterval(() => {
        this.tick++;
        const wood = this.getGameItemByID(2001);
        const workerContribution = this.activeWorkers;
        if (workerContribution > 0)
          this.$store.commit('purchaseItem', {
            resource: wood,
            amount: workerContribution,
            isGameTick: true,
          });
      }, this.gameTickrate);
    },
    craft(resource, amount = 1) {
      if (typeof resource === 'number') {
        resource = this.getGameItemByID(resource);
        this.$store.commit('purchaseItem', {
          resource: resource,
          amount: amount,
        });
      } else {
        this.$store.commit('purchaseItem', {
          resource: resource,
          amount: amount,
        });
      }
    },
    haveEnoughFor(itemID) {
      const { craftingCost } = this.getGameItemByID(itemID);
      if (craftingCost === null) return false;
      const reqItemID = Object.keys(craftingCost)[0];
      const reqItemAmt = Object.values(craftingCost)[0];
      const hasInInv = this.getInvItemAmountByID(Number(reqItemID));
      if (hasInInv < reqItemAmt) return true;
      else return false;
    },
    hire(id) {
      this.$store.commit('updateInventory', {
        purchaseItem: id,
        displayName: 'Worker',
        amount: 1,
        cost: {
          2002: 20,
        },
      });
    },
    devAdd() {
      const item = this.getGameItemByID(this.devAddItemID);
      const amount = this.devAddItemAmount;
      this.$store.commit('devPurchase', {
        resource: item,
        amount: amount,
      });
      console.log({
        resource: item,
        amount: amount,
      });
    },
    getInvItemCap(id) {
      for (const key in this.player.playerCaps) {
        if (Number(key) === id) return this.player.playerCaps[key];
      }
    },
    isCoreTool(id) {
      return this.coreTools.find((t) => t.id === id) ? true : false;
    },
    sortInv() {
      return this.inventory.sort((a, b) => a.id - b.id);
    },
    filterGameItemsByType(type) {
      return gameItems.filter((e) => e.type === type);
    },
    getGameItemByName(name) {
      return gameItems.find((e) => e.name === name);
    },
    getGameItemByID(id) {
      return gameItems.find((e) => e.id === id);
    },
    filterInvItemsByType(type) {
      return this.inventory.filter((e) => e.type === type);
    },
    getInvItemByName(name) {
      return this.inventory.find((e) => e.name === name);
    },
    getInvItemByID(id) {
      return this.inventory.find((e) => e.id === id);
    },
    getInvItemAmountByID(id) {
      let count = this.getInvItemByID(id);
      return count ? count.amount : 0;
    },
    cancelGameTime() {
      clearInterval(this.gametime);
    },
  },
  destroyed() {
    this.cancelGameTime();
  },
};
</script>

<style lang="scss" scoped>
.grid {
  display: grid;
  grid-template-columns: 350px 1fr;
  grid-template-rows: 1fr 40px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.inventory {
  grid-area: 1 / 1 / 2 / 2;
  background: #151623;
  padding: 1.5rem 0.5rem 0rem 0.5rem;
  strong {
    color: #d6d9dec2;
  }
  .current-output {
    font-size: 0.6rem;
    margin-right: 1rem;
    font-weight: 600;
    color: rgb(128, 114, 250);
  }
  .level {
    background: #0f101a;
    padding: 0.5rem;
  }
  .level-left {
    font-family: 'Turret Road', cursive;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
    font-size: 0.8rem;
  }
  .level-right {
    text-align: right;
    font-family: 'IBM Plex Mono', sans-serif;
    color: rgba(255, 255, 255, 0.836);
  }
}
.game-wrapper {
  grid-area: 1 / 2 / 2 / 3;
  background: #181c2e;
  padding: 0rem 1rem 1rem 1rem !important;
  hr {
    background: rgba(184, 114, 250, 0.52);
  }
}
.inventory-footer {
  grid-area: 2 / 1 / 3 / 2;
  background: #0d101b;
  padding: 0.5rem;
  p,
  a {
    color: #9288a8;
    font-family: 'Turret Road', cursive;
    letter-spacing: 0.1rem;
    span {
      color: MediumSlateBlue;
    }
  }
}
.game-footer {
  grid-area: 2 / 2 / 3 / 3;
  background: #0d101b;
  padding: 0.25rem;
  text-align: right;
  p {
    margin-right: 0.5rem;
    font-family: 'IBM Plex Mono', sans-serif;
  }
}
article {
  img {
    color: white !important;
  }
}
#game {
  min-height: calc(100vh - 56px);
  background: #181c2e;
  overflow: none;
  -ms-overflow-style: none !important; /* IE and Edge */
  scrollbar-width: none !important; /* Firefox */
  .title,
  .subtitle {
    color: ghostwhite;
    font-family: 'Turret Road', cursive;
    text-transform: uppercase;
  }
  &::-webkit-scrollbar {
    display: none !important;
  }
}
.game-container {
  overflow: none;
}
.content {
  padding: 0rem 1rem 0rem 1.5rem;
}

.logs {
  max-height: 400px;
  color: rgb(184, 114, 250);
  overflow-y: hidden;
  .wrapper {
    overflow-y: scroll;
  }
}
.is-core-tool {
  display: none;
}
</style>
