<template>
  <div id="game">
    <div class="columns is-fluid game-container">
      <div class="column is-3 inventory">
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
        <div v-if="inventory.length > 0" class="content">
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
                <span v-if="resource.id === 2001" class="current-output">
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
      </div>
      <div class="column right">
        <div class="container">
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
            <div class="logs tags">
              <div
                class="tag is-info is-rounded"
                v-for="(action, index) in actionLog"
                :key="index"
              >
                {{ action }}
              </div>
            </div>
          </section>
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AnimatedCounter from '@/components/AnimatedNumber';
import { gameItems } from '@/data/items';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      gametime: '',
      tick: 0,
    };
  },
  components: { AnimatedCounter },
  computed: {
    ...mapState(['inventory', 'workers', 'actionLog']),
    gameTickrate() {
      return process.env.VUE_APP_TICKRATE;
    },
    earthResources() {
      return gameItems.filter((e) => e.type === 'earth-resource');
    },
    coreTools() {
      return gameItems.filter((e) => e.type === 'core-tool');
    },
    tools() {
      return gameItems.filter((e) => e.type === 'tool');
    },
    workers() {
      return gameItems.filter((e) => e.type === 'worker');
    },
    machines() {
      return gameItems.filter((e) => e.type === 'machine');
    },
    activeWorkers() {
      return this.inventory.find((e) => e.id === 4001);
    },
    hasWorkbench() {
      return this.inventory.find((e) => e.name === 'workbench') ? true : false;
    },
    inventoryAltFormat() {
      const mapped = this.inventory.map((item) => {
        let obj = {};
        obj[item.id] = item.amount;
        return obj;
      });
      return Object.assign(...mapped);
    },
  },
  mounted() {
    this.gameTick();
  },
  methods: {
    filterGameItemsByType(type) {
      return gameItems.filter((e) => e.type === type);
    },
    getGameItemByName(name) {
      return gameItems.find((e) => e.name === name);
    },
    isCoreTool(id) {
      return this.coreTools.find((t) => t.id === id) ? true : false;
    },
    gameTick() {
      this.gametime = setInterval(() => {
        this.tick++;
        const workers = this.inventory.find((e) => e.id === 4001);
        const wood = gameItems.find((e) => e.id === 2001);
        const workerContribution = workers.amount * 1;
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
    haveEnoughFor(itemID) {
      const { craftingCost } = gameItems.find((item) => item.id === itemID);
      if (craftingCost === null) return false;

      let requiredResourceAmount, haveResourceAmount;

      for (const [key, value] of Object.entries(craftingCost)) {
        requiredResourceAmount = value;
        const { amount } = this.inventory.find(
          (item) => item.id === Number(key)
        );
        haveResourceAmount = amount;
      }

      if (requiredResourceAmount > haveResourceAmount) return true;
      else return false;
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
.is-core-tool {
  display: none;
}
#game {
  min-height: calc(100vh + 12px);
  width: 100vw;
  background: #151623;
  overflow: none;
  .title,
  .subtitle {
    color: ghostwhite;
    font-family: 'Turret Road', cursive;
    text-transform: uppercase;
  }
}
.game-container {
  overflow: none;
}
.content {
  padding: 0rem 1rem 0rem 1.5rem;
}
.inventory {
  background: #181c2e;
  min-height: calc(100vh + 12px);
  width: 350px !important;
  color: #d6d9de;
  padding: 0 !important;
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
.right {
  background: hsl(236, 24%, 11%);
  hr {
    background: rgba(184, 114, 250, 0.52);
  }
}
.logs {
  max-height: 400px;
  overflow: scroll;
  color: rgb(184, 114, 250);
}
</style>
