<template>
  <div class="home-page">
    <h1>欢迎登录！</h1>
    <p>这是您的个人主页。</p>
    <button @click="logout">退出登录</button>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    logout() {
      // 这里调用登出逻辑，例如发送请求到后端注销会话
      // 假设有一个 logout 方法处理登出逻辑
      this.logoutFromServer().then(() => {
        // 登出成功后，跳转到登录页面
        this.$router.push({ name: 'LoginIndex' });
      }).catch(error => {
        console.error('登出失败:', error);
      });
    },
    logoutFromServer() {

    }
  }
}
</script>

<style scoped>
.home-page {
  text-align: center;
  margin-top: 50px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
