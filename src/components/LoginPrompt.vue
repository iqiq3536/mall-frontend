<template>
  <div v-if="show" class="login-prompt">
    <div class="login-content">
      <p>请登录以获得更好的使用体验</p>
      <div class="actions">
        <button class="login-button" @click="goToLogin">立即登录</button>
        <button class="close-button" @click="closePrompt">×</button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie"; // 引入 js-cookie 库

export default {
  data() {
    return {
      show: false, // 控制提示框的显示与隐藏
    };
  },
  methods: {
    // 检查是否存在指定的 Cookie
    checkCookie(name) {
      return Cookies.get(name) !== undefined; // js-cookie 的 get 方法返回 undefined 表示不存在
    },
    // 关闭提示框
    closePrompt() {
      this.show = false;
    },
    // 跳转到登录页面
    goToLogin() {
      window.location.href = "/userLogin"; // 修改为你的登录页面路径
    },
  },
  mounted() {
    // 检测是否存在 userid Cookie
    if (!this.checkCookie("userid")) {
      this.show = true; // 如果没有，则显示提示框
    }
  },
};
</script>

<style scoped>
.login-prompt {
  position: fixed;
  bottom: 0; /* 紧贴页面底部 */
  left: 0;
  width: 100%; /* 占满整个底部 */
  background-color: rgba(0, 0, 0, 0.9); /* 黑色半透明背景 */
  color: white;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* 确保提示框显示在最前面 */
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
}

.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.login-content p {
  margin: 0 0 10px;
  font-size: 16px;
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.login-button {
  background-color: #ff4d4f; /* 按钮的红色背景 */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.login-button:hover {
  background-color: #e43b3d; /* 悬浮时更深的红色 */
}

.close-button {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  cursor: pointer;
  font-weight: bold;
  line-height: 1;
}

.close-button:hover {
  color: #f44336; /* 悬浮时按钮变为红色 */
}
</style>

