import Vue from 'vue';
import Vuex from 'vuex';
import { gameItems } from './data/items';
Vue.use(Vuex);

const generateDefaultResourceCaps = () => {
  const caps = {};
  for (const resource of gameItems) {
    caps[resource.id] = resource.defaultCap;
  }
  return caps;
};

const getInvItemAmount = (id, inventory) => {
  const item = inventory.find((e) => e.id === id);
  return item ? item.amount : 0;
};

const getInvItemCap = (id, player) => {
  for (const key in player.playerCaps) {
    if (Number(key) === id) return player.playerCaps[key];
  }
};

export default new Vuex.Store({
  mutations: {
    addToActionLog(state, n) {
      state.actionLog.unshift(n);
    },
    applyUpgrade(state, { id, amount }) {
      for (const [key] of Object.entries(state.player.playerCaps)) {
        if (key === id) state.player.playerCaps[key] += Number(amount);
      }
    },
    purchaseItem(state, { resource, amount = 1, isGameTick = false }) {
      // Check inventory cap before purchase, bail if too many items
      const invItemCap = getInvItemCap(resource.id, state.player);
      const hasInInv = getInvItemAmount(resource.id, state.inventory);
      if (hasInInv && hasInInv >= invItemCap) return;

      // Add to inventory
      const index = state.inventory.findIndex((r) => r.id === resource.id);
      if (index > -1) state.inventory[index].amount += Number(amount);
      else {
        state.inventory.push({
          id: resource.id,
          displayName: resource.displayName,
          amount: Number(amount),
          type: resource.type,
        });
        state.inventory.sort((a, b) => a.id - b.id);
      }

      // Apply build cost
      for (const [key, value] of Object.entries(resource.craftingCost)) {
        const i = state.inventory.findIndex((item) => item.id === Number(key));
        if (i > -1) state.inventory[i].amount -= Number(value);
      }

      // Add to action log
      if (isGameTick) return;
      else {
        if (state.actionLog.length == 5) state.actionLog.pop();
        state.actionLog.unshift(`+${amount} ${resource.displayName}`);
      }
    },
    devPurchase(state, { resource, amount = 1 }) {
      const index = state.inventory.findIndex((r) => r.id === resource.id);
      if (index > -1) state.inventory[index].amount += Number(amount);
      else
        state.inventory.push({
          id: resource.id,
          displayName: resource.displayName,
          amount: Number(amount),
          type: resource.type,
        });
    },
  },
  getters: {
    gameItemsByType: () => (type) => {
      return gameItems.filter((e) => e.type === type);
    },
    gameItemByID: () => (id) => {
      return gameItems.find((e) => e.id === id);
    },
    gameItemByName: () => (name) => {
      return gameItems.find((e) => e.name === name);
    },
    invItemsByType: (state) => (type) => {
      return state.inventory.filter((e) => e.type === type);
    },
    invItemByID: (state) => (id) => {
      return state.inventory.find((e) => e.id === id);
    },
    invItemAmtByID: (state) => (id) => {
      const i = state.inventory.find((e) => e.id === id);
      return i ? i.amount : 0;
    },
    invItemByName: (state) => (name) => {
      return state.inventory.find((e) => e.name === name);
    },
    hasItem: (state) => (id) => {
      return state.inventory.find((e) => e.id === id) ? true : false;
    },
  },
  state: {
    actionLog: ['Follow the distress call - fly to the moon.'],
    inventory: [],
    player: {
      displayName: '0NEGUY',
      playerCaps: generateDefaultResourceCaps(),
      equipped: [],
      upgrades: [],
    },
  },
});
