import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Profile',
        component: () => import('../views/Profile.vue')
    },
    {
        path: '/sgnn',
        name: 'Sgnn',
        component: () => import('../views/Sgnn.vue')
    },
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
        path: '/exec-stmt/list',
        name: 'ExecStmtList',
        component: () => import('../views/ExecStmtList.vue')
    },
    {
        path: '/exec-stmt/add',
        name: 'ExecStmtAdd',
        component: () => import('../views/ExecStmtAdd.vue')
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
