import { createRouter, createWebHistory } from "vue-router";


const routes = [

  {
    path: "/",
    name: "/",
    redirect: "/signin",
    component: () => import("../views/LoginComponent")
  },
  {
    path: "/signin",
    name: "signin",
    component: () => import("../views/LoginComponent"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/DashboardComponent"),
    meta : {requiresLogin: true},
  },
  {
    name: "index.artistas",
    path: "/artistas",
    component: () =>
    import ("@/views/artistas/IndexComponent"),
    meta: { requiresLogin: true },
  },
  {
    name: "create.artistas",
    path: "/artistas-create",
    component: () =>
    import ("@/views/artistas/CreateComponent"),
    meta: { requiresLogin: true },
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  mode: 'history',
  linkActiveClass: "active",
});


export default router;
