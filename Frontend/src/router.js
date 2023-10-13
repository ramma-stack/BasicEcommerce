import { createWebHistory, createRouter } from "vue-router";

import Home from "./pages/Home.vue";
import Product from "./pages/Product.vue";
import Paginate from "./pages/Paginate.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        props: (route) => ({ page: parseInt(route.query.page) || 1 }),
    },
    {
        name: "product",
        path: "/product/:id",
        component: Product,
        props: true,
    },
    {
        name: "paginate",
        path: "/paginate",
        component: Paginate,
        props: true,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;