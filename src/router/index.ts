import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RemoteConsole from "@/views/RemoteConsole.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "home", component: HomeView },
    { path: "/remoteConsole", name: "remoteConsole", component: RemoteConsole }
  ]
});

export default router;
