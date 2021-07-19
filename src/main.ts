import Vue from 'vue';
import App from './App.vue';
import router from './routes';
import store from './state';
import Buefy from 'buefy';

Vue.use(Buefy);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
