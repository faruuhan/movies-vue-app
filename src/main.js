import { createApp } from "vue";
import { store } from "../src/stores/";
import "./index.css";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(store).mount("#app");
