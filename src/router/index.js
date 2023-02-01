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
    name: "index.canciones",
    path: "/canciones",
    component: () =>
    import ("@/views/canciones/IndexComponent"),
    meta: { requiresLogin: true },
  },
  {
    name: "create.canciones",
    path: "/canciones-create",
    component: () =>
    import ("@/views/canciones/CreateComponent"),
    meta: { requiresLogin: true },
  },
  {
    name: "edit.canciones",
    path: "/canciones-edit/:id_cancion",
    component: () =>
    import ("@/views/canciones/EditComponent"),
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
