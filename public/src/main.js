import Vue from 'vue'
import App from './App.vue';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import VueResource from 'vue-resource';

Vue
    .use(BootstrapVue)
    .use(VueResource);


new Vue({
  el: '#app',
  store,
  component: App,
  render: h => h(App),
});
