<template>
  <main>
    <vuescroll>
      <div id="game" class="grid">
        <div class="inventory">
          <br />
          <h1
            class="title is-4 has-text-centered"
            style="color: ghostwhite; font-family: 'Turret Road', cursive"
          >
            FAR SIDE <span class="latin">α</span>
          </h1>
          <p class="small has-text-centered tick" style="color: white">
            Game Tickrate: {{ gameTickrate }}ms
          </p>
          <hr />
          <div v-if="inventory" class="content">
            <div
              v-for="resource in inventory"
              :key="resource.id"
              style="margin-bottom: 0.75rem"
              :class="{ 'is-core-tool': isCoreTool(resource.id) }"
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
                    +{{ activeWorkers.amount }}/tick
                  </span>
                  <animated-counter
                    class="level-item"
                    :number="resource.amount"
                    :cap="250"
                  ></animated-counter>
                </div>
              </div>
            </div>
          </div>
          <InventoryGrid />
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
          </div>
        </div>
        <div class="game-footer" style="font-family: 'IBM Plex Mono">
          TICK: {{ tick }}
        </div>
      </div>
    </vuescroll>
  </main>
</template>

<script>
import vuescroll from 'vuescroll';
import AnimatedCounter from '@/components/AnimatedNumber';
import InventoryGrid from '@/components/InventoryGrid';
import { gameItems } from '@/data/items';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      gametime: '',
      tick: 0,
    };
  },
  components: { AnimatedCounter, vuescroll, InventoryGrid },
  computed: {
    ...mapState(['inventory', 'workers', 'actionLog']),
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
      return this.getInvItemByID(4001) || 0;
    },
    hasWorkbench() {
      return this.getInvItemByName('workbench') ? true : false;
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
        const workerContribution = this.totalWorkersHired();
        if (workerContribution > 0)
          this.$store.commit('purchaseItem', {
            resource: wood,
            amount: workerContribution,
            isGameTick: true,
          });
      }, this.gameTickrate);
    },
    totalWorkersHired() {
      if (this.inventory)
        return this.inventory.reduce((acc, e) => {
          if (e.id === 4001) return acc + e.amount;
          else return acc;
        }, 0);
      else return 0;
    },
    craft(resource, amount = 1) {
      if (typeof resource === 'number') {
        resource = gameItems.find((e) => e.id === resource);
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
    isCoreTool(id) {
      return this.coreTools.find((t) => t.id === id) ? true : false;
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
  background: #181c2e;
  color: #d6d9de;
  .tick {
    font-family: 'IBM Plex Mono', sans-serif;
  }
  .latin {
    font-family: 'IBM Plex Sans', sans-serif;
    text-transform: none;
  }
  hr {
    background: #f8f8ff34;
  }
  pre {
    background: #151623;
    color: ghostwhite;
    font-family: 'IBM Plex Mono', sans-serif;
  }
  strong {
    color: white;
  }
  .current-output {
    font-size: 0.6rem;
    margin-right: 1rem;
    font-weight: 600;
    color: rgb(184, 114, 250);
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
  }
}
.game-wrapper {
  grid-area: 1 / 2 / 2 / 3;
  background: hsl(236, 24%, 11%);
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
      color: rgba(184, 114, 250, 0.52);
    }
  }
}
.game-footer {
  grid-area: 2 / 2 / 3 / 3;
  background: #0d101b;
  padding: 0.25rem;
}
article {
  img {
    color: white !important;
  }
}
#game {
  min-height: calc(100vh + 12px);
  background: #151623;
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
