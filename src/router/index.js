import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/dev-link/list',
        name: 'DevLinkList',
        component: () => import('../views/DevLinkList.vue')
    },
    {
        path: '/dev-link/add',
        name: 'DevLinkAdd',
        component: () => import('../views/DevLinkAdd.vue')
    },
    {
        path: '/',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
