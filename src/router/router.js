import {createRouter, createWebHistory} from 'vue-router'
import AdminPage from "../pages/adminPage/AdminPage.vue";
// TODO someday replace this with an auto generated router
// pain in the butt to batch add new routes
const routes = [


    { path: '/admin',name:'AdminPage', component: () => import("../pages/adminPage/AdminPage.vue/") },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("../pages/NotFound.vue") },
]



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;