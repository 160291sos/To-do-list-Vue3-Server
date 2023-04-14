import Main from "@/pages/Main.vue";
import { createRouter, createWebHistory } from "vue-router";
import UserPage from "@/pages/UserPage.vue";
import AdminPage from "@/pages/AdminPage.vue";
import NewPage from "@/pages/NewPage.vue";


const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/user',
        component: UserPage,
        name: 'userId',
        props: true
    },
    {
        path: '/admin',
        component: AdminPage
    },
    {
        path: '/new',
        component: NewPage
    }
]

const router = createRouter(
    {
        routes,
        history: createWebHistory(process.env.BASE_URL)
    }
)
export default router;