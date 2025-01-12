// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/views/login/loginPage.vue';
import HomePage from '@/views/home/homePage.vue'
// import LoginPage2 from '@/views/login/loginPage2.vue';

Vue.use(Router);

const routes = [
    //登录页面
    {
        path: '/1',
        name: 'LoginPage',
        component: LoginPage,
    },
    // {
    //     path: '/login2',
    //     name: 'LoginPage2',
    //     component: LoginPage2,
    // },
    //欢迎页
    {
        path: '/home',
        name: 'HomePage',
        component: HomePage,
        meta: { requiresAuth: true }
    },
    /*{
        path: "/security",
        name: "security",
        component: () => import("@/views/Security.vue"),
    },
    {
        path: "/profile",
        name: "profile",
        component: () => import("@/views/Profile.vue"),
    },
    {
        path: "/address",
        name: "address",
        component: () => import("@/views/Address.vue"),
    },*/
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/UserMessage.vue'),
    },
    {
        path: '/user-edit',
        name: 'EditUser',
        component: () => import('@/views/user/UserEdit.vue'),
    },
    {
      path: '/goods',
      name: 'Goods',
      component: () => import('@/views/seller_sys/goodsPage.vue'),
    },
    {
      path: '/',
      name: 'ImgPage',
      component: () => import('@/views/seller_sys/Products/imgPage.vue'),
    },
    {
        path: '/2',
        name: 'ImgOut',
        component: () => import('@/views/seller_sys/Products/AddPage.vue'),
    },
    {
        path: '/3',
        name: 'TestList',
        component: () => import('@/views/seller_sys/Products/SearchEditDeletePage.vue'),
    },
];


const router = new Router({
    mode: 'history',
    routes,
});

export default router;
