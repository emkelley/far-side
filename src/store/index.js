import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    actionLog: ['Game started'],
    inventory: [
      {
        id: 2001,
        displayName: 'Wood',
        amount: 150,
      },
      {
        id: 2002,
        displayName: 'Hardwood',
        amount: 100,
      },
      {
        id: 4001,
        displayName: 'Worker',
        amount: 15,
      },
    ],
  },
  mutations: {
    purchaseUpgrade(state, n) {
      state.inventory.push(n);
    },
    addToActionLog(state, n) {
      state.actionLog.unshift(n);
    },
    purchaseItem(state, { resource, amount = 1, isGameTick = false }) {
      // Add new item to inventory or update amount if existing
      const i = state.inventory.findIndex((_item) => _item.id === resource.id);
      if (i > -1) state.inventory[i].amount += amount;
      else
        state.inventory.push({
          id: resource.id,
          displayName: resource.displayName,
          amount: amount,
        });

      // Apply build cost
      for (const [key, value] of Object.entries(resource.craftingCost)) {
        const i = state.inventory.findIndex((item) => item.id === Number(key));
        if (i > -1) state.inventory[i].amount -= value;
      }
      if (isGameTick) return;
      else
        state.actionLog.unshift(`Purchased ${resource.displayName} x${amount}`);
    },
  },
  modules: {},
});
