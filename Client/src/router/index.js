import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/Signup.vue";

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/DashBoard",
    name: "DashBoard",
    component: () => import("../views/TeacherDashbord.vue"),
  },
  {
    path: "/Home",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/Signin.vue"),
  },
  {
    path: "/create",
    name: "create",
    component: () => import("../components/Createquestions.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
