import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TasksView from "../views/TasksView.vue";
import OneTaskView from "../views/OneTaskView.vue";
import NotFound from "../views/NotFound.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/tasks",
      name: "tasks",
      component: TasksView,
    },
    {
      path: "/tasks/:category/:id",
      name: "oneTask",
      component: OneTaskView,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    }
  ],
});

export default router;
