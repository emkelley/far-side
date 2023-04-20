import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Lore from "@/views/Lore.vue";
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
      path: "/lore",
      name: "Lore",
      component: Lore,
    },
    {
      path: "/reference",
      name: "Reference",
      component: Reference,
    },
  ],
});

export default router;
