<template>
  <nav class="navbar">
    <div class="navbar-left">
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/" class="navbar-link">首页</router-link>
          <ul class="dropdown">
            <li><router-link to="/home/new-arrivals" class="dropdown-link">新品</router-link></li>
            <li><router-link to="/home/popular" class="dropdown-link">热销</router-link></li>
          </ul>
        </li>
        <li class="navbar-item" v-if="userName_test">
          <router-link to="/user" class="navbar-link">{{ this.userName_test }}</router-link>
          <ul class="dropdown">
            <li><router-link to="/user/profile" class="dropdown-link">个人信息</router-link></li>
            <li><router-link to="/user/settings" class="dropdown-link">设置</router-link></li>
          </ul>
        </li>
        <li class="navbar-item" v-else>
          <span>您好，请 <a :href="loginLink" class="login-link">登录</a> 或 <a :href="registerLink" class="register-link">注册</a></span>
        </li>
      </ul>
    </div>
    <div class="navbar-right">
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/MyCarts" class="navbar-link">购物车</router-link>
          <ul class="dropdown">
            <li><router-link to="/familyCart" class="dropdown-link">家庭购物车</router-link></li>
            <!--<li><router-link to="/cart/checkout" class="dropdown-link">结算</router-link></li>-->
          </ul>
        </li>
        <li class="navbar-item">
          <router-link to="/user_order_list" class="navbar-link">我的订单</router-link>
          <ul class="dropdown">
            <li><router-link to="/orders/history" class="dropdown-link">订单历史</router-link></li>
            <li><router-link to="/orders/track" class="dropdown-link">订单追踪</router-link></li>
          </ul>
        </li>
        <li class="navbar-item">
          <router-link to="/merchantLogin" class="navbar-link">商家服务</router-link>
          <ul class="dropdown">
            <li><router-link to="/merchantLogin" class="dropdown-link">商家面板</router-link></li>
            <li><router-link to="/merchantLogin" class="dropdown-link">支持</router-link></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>
import axios from "axios";

export default {
  name: 'NavigationBar',
  data() {
    return {
      userName_test: '',  // 获取cookie中的user_id
      loginLink: 'userLogin',   // 替换为您的登录链接
      registerLink: 'userRegister'  // 替换为您的注册链接
    };
  },
  created() {
    this.fetchMerchantName();
  },
  methods: {
    fetchMerchantName() {
      axios.get('http://localhost:8081/api/users_name', {withCredentials: true}).then(response => {
        this.userName_test = response.data;
        console.log(this.userName_test);
      });
    },
  }
};
</script>

<style scoped>
.navbar {
  background-color: #f7f7f7;  /* 添加淡灰色背景 */
  width: 100%;  /* 使导航栏占满整个屏幕 */
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.navbar-left,
.navbar-right {
  display: flex;
}

.navbar-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.navbar-item {
  margin: 0 20px;
  position: relative; /* 为下拉菜单做定位 */
}

.navbar-link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.navbar-link:hover {
  color: #f90;
}

.navbar-right .navbar-item {
  margin-left: 30px;
}

/* 下拉菜单样式 */
.dropdown {
  display: none; /* 默认不显示 */
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #fff;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 200px;
  border-radius: 4px;
  z-index: 1;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  opacity: 0; /* 初始透明度为0 */
  visibility: hidden; /* 初始不可见 */
}

.navbar-item:hover .dropdown {
  display: block;
  opacity: 1;  /* 鼠标悬停时显示，带有渐变效果 */
  visibility: visible;
}

.dropdown-link {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  font-size: 14px;
  transition: background-color 0.2s, color 0.2s;
}

.dropdown-link:hover {
  background-color: #f0f0f0;
  color: #ff0048;
}
.navbar-item span {
  font-size: 16px;
  color: #333;
}

.navbar-item .login-link,
.navbar-item .register-link {
  color: #3eb0b2;
  font-weight: bold;
  text-decoration: none;
  margin: 0 5px;
  transition: color 0.3s ease, transform 0.3s ease;
}

.navbar-item .login-link:hover,
.navbar-item .register-link:hover {
  color: #5a00b3;  /* 鼠标悬停时变为深蓝色 */
  transform: translateY(-3px);  /* 鼠标悬停时产生轻微上移效果 */
}
</style>




