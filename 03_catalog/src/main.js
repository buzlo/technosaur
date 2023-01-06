import Vue from 'vue';
import App from './App.vue';

import { greeting, framework } from './data/strings';
import greet from './data/function';

greet(greeting, framework);
greet('Hi', 'Batman');

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
