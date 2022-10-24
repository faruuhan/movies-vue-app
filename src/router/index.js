import { createRouter, createWebHistory } from "vue-router";
import Homepage from "./../views/Homepage.vue";
import DetailMovie from "./../views/DetailMovie.vue";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/detail",
    name: "DetailMovie",
    component: DetailMovie,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
