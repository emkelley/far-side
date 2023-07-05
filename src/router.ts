import { createRouter, createWebHistory } from "vue-router";

import Game from "@/views/Game.vue";
import Reference from "@/views/Reference.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Game",
      component: Game,
    },
    {
      path: "/reference",
      name: "Reference",
      component: Reference,
    },
  ],
});

export default router;
