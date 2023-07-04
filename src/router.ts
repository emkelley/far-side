import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Play from "@/views/Play.vue";
import Reference from "@/views/Reference.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/play",
      name: "Play",
      component: Play,
    },
    {
      path: "/reference",
      name: "Reference",
      component: Reference,
    },
  ],
});

export default router;
