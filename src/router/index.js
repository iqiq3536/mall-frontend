// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/views/login/loginPage.vue';
import HomePage from '@/views/home/homePage.vue'
import MallHomePage from "@/views/home/MallHomePage.vue";
import ProductDetail from "@/components/ProductDetail.vue";
// import LoginPage2 from '@/views/login/loginPage2.vue';

Vue.use(Router);

const routes = [
    {
        path: '/home',
        name: 'MallHomePage',
        component: MallHomePage,
    },
    {
        path: "/product/:id", // 商品详情页，动态参数 `id`
        name: "ProductDetail",
        component: ProductDetail,
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
    {
        path: '/MyCarts',
        name: 'MyCarts',
        component: () => import('@/views/shipping_carts/user_cart/cart_details.vue')
    },
    {
        path: '/userPayment',
        name: 'userPayment',
        component: () => import('@/views/order/user_order/user_payment.vue')
    },
    {
        path: '/user_order_list',
        name: 'user_order_list',
        component: () => import('@/views/order/user_order/user_order_list.vue')
    },
    {
        path: '/user_order_details_list',
        name: 'user_order_details_list',
        component: () => import('@/views/order/user_order/user_order_details_list.vue')
    },

];


const router = new Router({
    mode: 'history',
    routes,
});

export default router;
