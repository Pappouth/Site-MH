import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SelectedMonsterView from "../views/SelectedMonsterView.vue";
import SelectedGameView from "../views/SelectedGameView.vue";
import AllGamesView from "../views/AllGamesView.vue";
import AllMonstersView from "../views/AllMonstersView.vue";
import AddMonsterView from "../views/AddMonsterView.vue";
import LoginView from "../views/LoginView.vue";
import PageNotFound from "../views/PageNotFound.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path:"/monsters/:name",
    component: SelectedMonsterView
  },
  {
    path:"/games/:name",
    component: SelectedGameView
  },
  {
    path:"/games",
    component: AllGamesView
  },
  {
    path:"/monsters",
    component: AllMonstersView,
  },
  {
    path:"/addmonster",
    component: AddMonsterView,
  },
  {
    path: "/login",
    component: LoginView
  },
  {
    path: "/:catchAll(.*)",
    alias: "/404",
    component: PageNotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
