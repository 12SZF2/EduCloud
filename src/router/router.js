import {createRouter, createWebHistory} from 'vue-router'
import AdminPage from "../pages/adminPages/AdminPage.vue";
// TODO someday replace this with an auto generated router
// pain in the butt to batch add new routes
const routes = [


    { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import("../pages/NotFound.vue") },
    {
        path: '/admin',
        name:'AdminPage',
        component: () => import("../pages/adminPages/AdminPage.vue/"),
        children: [
            {
                path: 'module-create',
                name: 'CreateModule',
                component: () => import("../pages/adminPages/module/CreateModule.vue"),
            },
            {
                path: 'module-list',
                name: 'ListModule',
                component: () => import("../pages/adminPages/module/ListModule.vue"),
            },
            {
                path: 'assignment-create',
                name: 'CreateAssignment',
                component: () => import("../pages/adminPages/assignment/CreateAssignment.vue"),
            },
            {
                path: 'assignment-list',
                name: 'ListAssignment',
                component: () => import("../pages/adminPages/assignment/ListAssignment.vue"),
            },
            {
                path: 'user-create',
                name: 'CreateUser',
                component: () => import("../pages/adminPages/user/CreateUser.vue"),
            },
            {
                path: 'user-list',
                name: 'ListUser',
                component: () => import("../pages/adminPages/user/ListUser.vue"),
            }
        ]},
]



const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
})

export default router;