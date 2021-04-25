import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from "axios";
import titleMixin from "./mixins/titleMixin";

const base = axios.create({
  baseURL: "http://localhost:8085/api/",
});

Vue.prototype.$http = base;
Vue.mixin(titleMixin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
