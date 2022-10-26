import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";
import DetailMovie from "../views/DetailMovie.vue";
import CategoryMovie from "../views/CategoryMovie.vue";

const routes = [
  {
    path: "/",
    name: "Homepage",
    component: Homepage,
  },
  {
    path: "/detail/:id",
    name: "DetailMovie",
    component: DetailMovie,
  },
  {
    path: "/:category",
    name: "CategoryMovie",
    component: CategoryMovie,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
