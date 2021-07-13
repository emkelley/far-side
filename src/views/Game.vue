<template>
  <main>
    <div id="game" class="grid">
      <div class="inventory">
        <div v-if="inventory" class="">
          <h1 class="title has-text-centered is-5">Inventory</h1>
          <div
            v-for="resource in invSortedByID"
            :key="resource.id"
            style="margin-bottom: 0.75rem"
            :class="{ 'is-hidden': getInvItemCap(resource.id) === 1 }"
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
          <div v-if="hasWorkbench">
            <hr />
            <h1 class="title has-text-centered is-5">Tools</h1>
            <div
              v-for="tool in tools"
              :key="tool.id"
              style="margin-bottom: 0.75rem"
              :class="{ 'is-hidden': !alreadyOwns(tool.id) }"
            >
              <div class="level">
                <div class="level-left">
                  <strong class="level-item">{{ tool.displayName }}</strong>
                </div>
                <div class="level-right">
                  <span
                    v-if="tool.id === 2001 && activeWorkers"
                    class="current-output"
                  >
                    +{{ activeWorkers }}/tick
                  </span>
                  <i class="fa-thin fa-check"></i>
                </div>
              </div>
            </div>
          </div>
          <div v-if="inventory.length === 0" class="container is-fluid">
            <h1 class="title has-text-centered is-7" style="opacity: 0.5">
              gather some wood to get started
            </h1>
          </div>
        </div>
        <div v-if="devEnvironment" id="dev-panel">
          <hr />
          <div class="dev-wrapper">
            <h1 class="title has-text-centered is-5" style="color: DarkCyan">
              Item Spawner
            </h1>
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
                  {{ item.id }} - {{ item.name }} -
                  {{ item.displayName }}
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
              Add item(s) to inventory
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
                v-show="!alreadyOwns(1001)"
                class="button is-small is-primary"
                @click="craft(1001)"
                :disabled="haveEnoughFor(1001)"
              >
                Build a Workbench
              </button>
              <div v-show="alreadyOwns(1001)">
                <b-button
                  v-for="tool in tools"
                  :key="tool.id"
                  v-show="!alreadyOwns(tool.id)"
                  class="button is-small is-primary"
                  @click="craft(tool.id)"
                  :disabled="haveEnoughFor(tool.id)"
                  :label="tool.displayName"
                >
                  {{ tool.displayName }}
                </b-button>
              </div>
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
            <p v-for="(action, index) in actionLog" :key="index">
              {{ action }}
            </p>
          </section>
          <hr />
          <section class="DEV">
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
  </main>
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
      devAddItemID: 2001,
      devAddItemAmount: 100,
      gameItems,
    };
  },
  components: { AnimatedCounter },
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
    invTools() {
      return this.filterInvItemsByType('tool');
    },
    allTools() {
      return this.tools.concat(this.coreTools);
    },
    workers() {
      return this.filterGameItemsByType('worker');
    },
    machines() {
      return this.filterGameItemsByType('machine');
    },
    activeWorkers() {
      const workerInInv = this.getInvItemByID(4001);
      return workerInInv ? workerInInv.amount : 0;
    },
    hasWorkbench() {
      return this.getInvItemByName('Workbench') ? true : false;
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
        const workerContribution = this.activeWorkers;
        const wood = this.getGameItemByID(2001);
        if (!wood) return;
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
      else if (this.playerHasRequiredTool(itemID)) return false;
      else return true;
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
    playerHasRequiredTool(id) {
      const item = this.getGameItemByID(id);
      const hasInInv = this.hasItemInInventory(item.requiredTool);
      if (item.requiredTool === undefined) return true;
      return hasInInv;
    },
    alreadyOwns(id) {
      const item = this.getInvItemByID(id);
      if (item) return true;
      else return false;
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
    getToolsInInventory() {
      return this.inventory.filter((e) => e.type === 'tool');
    },
    getInvItemByName(name) {
      return this.inventory.find((e) => e.displayName === name);
    },
    getInvItemByID(id) {
      return this.inventory.find((e) => e.id === id);
    },
    hasItemInInventory(id) {
      const item = this.getInvItemByID(id);
      return item ? true : false;
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
  hr {
    background: rgba(184, 114, 250, 0.32);
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
.is-hidden {
  display: none;
}
#dev-panel {
  padding: 0.5rem;
  opacity: 0.4;
  transition: opacity 0.5s;
  &:hover {
    opacity: 1;
  }
  .dev-wrapper {
    background: rgba(0, 0, 0, 0.747);
    padding: 1rem;
    color: white;
    border: 1px solid rgb(184, 114, 250);
    border-radius: 6px;
    &::selection,
    ::-moz-selection {
      background: rgba(184, 114, 250, 0.5);
    }
    option {
      color: ghostwhite;
      span {
        color: rgba(184, 114, 250, 0.5) !important;
      }
    }
  }
}
</style>
