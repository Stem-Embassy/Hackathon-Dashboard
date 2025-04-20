/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from "vue-router/auto";

import HomeView from "../pages/index.vue";
import InformationPage from "@/pages/informationPage.vue";
import RobotController from "@/pages/RobotControllerPage.vue";
import  RankingsPage from "@/pages/rankingsPage.vue";
import Login from "@/pages/login.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/controller", component: RobotController },
  { path: "/information", component: InformationPage },
  { path: "/questions", component: HomeView },
  { path: "/rankings", component: RankingsPage },
  { path: "/login", component: Login},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.("Failed to fetch dynamically imported module")) {
    if (!localStorage.getItem("vuetify:dynamic-reload")) {
      console.log("Reloading page to fix dynamic import error");
      localStorage.setItem("vuetify:dynamic-reload", "true");
      location.assign(to.fullPath);
    } else {
      console.error("Dynamic import error, reloading page did not fix it", err);
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem("vuetify:dynamic-reload");
});

export default router;
