import { createWebHistory, createRouter } from "vue-router";

// layouts
import AdminLayout from "./layouts/AdminLayout.vue";
import GuestLayout from "./layouts/GuestLayout.vue";

// auths
import LoginPage from "./pages/auth/LoginPage.vue";
import RegisterPage from "./pages/auth/RegisterPage.vue";

// pages
import Home from "./pages/Home.vue";
import Product from "./pages/Product.vue";
import Paginate from "./pages/Paginate.vue";

const routes = [
    {
        path: "/login",
        name: "GuestLayout",
        component: GuestLayout,
        children: [
            {
                path: "",
                name: "Login",
                component: LoginPage,
            },
            {
                path: "/register",
                name: "Register",
                component: RegisterPage,
            },
        ],
        beforeEnter(to, from, next) {
            if (localStorage.getItem('access_token')) {
                next({ name: 'Home' });
            } else {
                next();
            }
        }
    },
    {
        path: "/",
        name: "AdminLayout",
        component: AdminLayout,
        children: [
            {
                path: "",
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
        ],
        beforeEnter(to, from, next) {
            if (!localStorage.getItem('access_token')) {
                next({ name: 'Login' });
            } else {
                next();
            }
        }
    },
];


const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;