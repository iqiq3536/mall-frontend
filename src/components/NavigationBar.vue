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
        <!-- 如果有userId，则显示“我的”，否则显示登录/注册 -->
        <li class="navbar-item" v-if="userId">
          <router-link to="/user" class="navbar-link">我的</router-link>
        </li>
        <li class="navbar-item" v-else>
          <span>您好，请 <a :href="loginLink" class="login-link">登录</a> 或 <a :href="registerLink" class="register-link">注册</a></span>
        </li>
      </ul>
    </div>
    <div class="navbar-right">
      <ul class="navbar-list">
        <button @click="clk">测试</button>
        <li class="navbar-item">
          <router-link to="/cart" class="navbar-link">购物车</router-link>
          <ul class="dropdown">
            <li><router-link to="/cart/view" class="dropdown-link">查看购物车</router-link></li>
            <li><router-link to="/cart/checkout" class="dropdown-link">结算</router-link></li>
          </ul>
        </li>
        <li class="navbar-item">
          <router-link to="/orders" class="navbar-link">我的订单</router-link>
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
export default {
  name: 'NavigationBar',
  data() {
    return {
      userId: '123',  // 获取cookie中的user_id
      loginLink: '/userLogin',   // 登录链接
      registerLink: '/userRegister'  // 注册链接
    };
  },
  methods: {
    clk() {console.log(this.userId)},
    // 获取 cookie 中的值
    getCookie(name) {
      if (typeof document === 'undefined') { // 检查是否在客户端环境中
        return null;
      }
      let match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
      if (match) return decodeURIComponent(match[2]); // 解码可能被编码的cookie值
      return null;
    }
  },
  watch: {
    userId(newValue) {
      if (newValue) {
        // 可以在这里添加额外的逻辑，比如刷新某些数据或通知用户
      }
    }
  },
  mounted() { // 在组件挂载后再次尝试获取cookie，确保DOM已经完全加载
    this.userId = this.getCookie('user_id');
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




