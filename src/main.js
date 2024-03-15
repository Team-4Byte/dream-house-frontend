import "./assets/main.css";
// import KakaoMapsPlugin from "./plugins/kakaoMaps";

import { createApp } from "vue";
import { createPinia } from "pinia";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import App from "./App.vue";
import router from "./router";
import HighchartsVue from "highcharts-vue";

const app = createApp(App);
const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(HighchartsVue);

const vuetify = createVuetify({
  components,
  directives,
});

app.use(router).use(vuetify).mount("#app");
