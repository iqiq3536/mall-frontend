// src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/views/login/loginPage.vue';
import HomePage from '@/views/home/homePage.vue'
import MallHomePage from "@/views/home/MallHomePage.vue";
import ProductDetail from "@/components/ProductDetail.vue";
import searchResult from "@/views/productSearch/searchResult.vue";
import userRegister from "@/views/register/userRegister.vue";
import adminLoginPage from "@/views/login/adminLoginPage.vue";
import merchantLoginPage from "@/views/login/merchantLoginPage.vue";
import userLoginPage from "@/views/login/userLoginPage.vue";
// import LoginPage2 from '@/views/login/loginPage2.vue';

Vue.use(Router);

const routes = [
    {//首页
        path: '/',
        name: 'MallHomePage',
        component: MallHomePage,
    },
    {
        path: "/product/:id", // 商品详情页，动态参数 `id`
        name: "ProductDetail",
        component: ProductDetail,
    },
    {
        path: "/search_result",
        name: "SearchResult",
        component: searchResult,
    },
    {
      path: "/userRegister",
      name: "UserRegister",
      component: userRegister,
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
        component: () => import("@/views/login/adminLoginPage.vue"),
    },
    {

        path: "/sellerControl",
        name: "sellerControl",
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
      path: '/image',
      name: 'ImgPage',
      component: () => import('@/views/seller_sys/Products/imgPage.vue'),
    },
    {
        path: '/ProductAdd',
        name: 'ProductAdd',
        component: () => import('@/views/seller_sys/Products/AddPage.vue'),
    },
    {
        path: '/ProductList',
        name: 'TestList',
        component: () => import('@/views/seller_sys/Products/SearchEditDeletePage.vue'),
    },
    {
        path: '/ProductExam',
        name: 'ProductExam',
        component: () => import('@/views/seller_sys/Products/testPage.vue')
    },
    {
        path: '/ProductTagEdit',
        name: 'ProductTagEdit',
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
    //登录页面
    {
        path: '/userLogin',
        name: 'userLoginPage',
        component: userLoginPage,
    },
//登录页面2
    {
        path: '/merchantLogin',
        name: 'merchantLoginPage',
        component: merchantLoginPage,
    },
//登录页面3
    {
        path: '/adminLogin',
        name: 'adminLoginPage',
        component: adminLoginPage,}
];


const router = new Router({
    mode: 'history',
    routes,
});

export default router;
