import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

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
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    // {
    //     path: '/vuetify',
    //     name: 'vuetify',
    //     component: () => import('../views/Vuetify.vue')
    // },
    // {
    //     path: '/save',
    //     name: 'save',
    //     component: () => import('../views/Save.vue')
    // },
    // {
    //     path: '/srch',
    //     name: 'srch',
    //     component: () => import('../views/Srch.vue')
    // }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
