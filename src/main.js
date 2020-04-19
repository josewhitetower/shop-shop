import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import "./assets/styles/index.css";

Vue.config.productionTip = false;

import feather from "vue-icon";
Vue.use(feather, "v-icon");

new Vue({
  render: h => h(App)
}).$mount("#app");
