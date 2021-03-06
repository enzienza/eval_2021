import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login";
import Products from "../views/Products";
import ProductsList from "../components/products/ProductsList";
import ProductNew from "../components/products/ProductNew";
import ProductEdit from "../components/products/ProductEdit";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
    beforeEnter:(to,from,next) => {
      localStorage.connected && localStorage.connected === 'true' ? next({name:'products-list'}) : next()
    },
  },
  {
    path: "/products",
    name: "product",
    component: Products,
    beforeEnter:(to,from,next) => {
      localStorage.connected && localStorage.connected === 'true' ? next() : next({name:'login'})
    },
    children:[
      {
        path: "",
        name: "products-list",
        component: ProductsList
      },
      {
        path: "create",
        name: "product-create",
        component: ProductNew
      },
      {
        path: "edit/:id",
        name: "product-edit",
        component: ProductEdit
      }
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
