// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/views/login/loginPage.vue';
import HomePage from '@/views/home/homePage.vue'
import MallHomePage from "@/views/home/MallHomePage.vue";
// import LoginPage2 from '@/views/login/loginPage2.vue';

Vue.use(Router);

const routes = [
    {
        path: '/home',
        name: 'MallHomePage',
        component: MallHomePage,
    },
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
    {

        path: "/adminLogin",
        name: "adminLogin",
        component: () => import("@/views/admin/adminLogin.vue"),
    },
    {

        path: "/sellerLogin",
        name: "sellerLogin",
        component: () => import("@/views/admin/sellerControl.vue"),
    },
    {

        path: "/adminControl",
        name: "adminControl",
        component: () => import("@/views/admin/adminControl.vue"),
    },
    {

        path: "/admin",
        name: "admin",
        component: () => import("@/views/admin/adminControl.vue"),
    },
    {

        path: "/profile",
        name: "profile",
        component: () => import("@/views/user/UserProfile.vue"),
    },
    {
        path: "/address",
        name: "address",
        component: () => import("@/views/user/UserAddress.vue"),
    },
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
        path: '/ProductAdd',
        name: 'ImgOut',
        component: () => import('@/views/seller_sys/Products/AddPage.vue'),
    },
    {
        path: '/ProductEdit',
        name: 'TestList',
        component: () => import('@/views/seller_sys/Products/SearchEditDeletePage.vue'),
    },
    {
        path: '/ProductTest',
        name: 'Test2',
        component: () => import('@/views/seller_sys/Products/testPage.vue')
    },
    {
        path: '/ProductTagEdit',
        name: 'Test3',
        component: () => import('@/views/seller_sys/Products/EditTag.vue')
    },
];


const router = new Router({
    mode: 'history',
    routes,
});

export default router;
