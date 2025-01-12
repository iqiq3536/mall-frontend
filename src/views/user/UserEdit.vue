<template>
  <div class="user-edit-container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h2 class="sidebar-title">账户管理</h2>
      <ul class="nav-list">
        <li
            v-for="(item, index) in navItems"
            :key="index"
            :class="{ active: activeItem === item.key }"
            @click="handleNavClick(item.key)"
        >
          {{ item.label }}
        </li>
      </ul>
    </aside>

    <!-- 右侧内容区域 -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeItem: "security", // 默认选中项
      navItems: [
        { key: "security", label: "安全管理" },
        { key: "profile", label: "个人资料" },
        { key: "address", label: "收货地址" },
      ],
    };
  },
  methods: {
    handleNavClick(key) {
      this.activeItem = key;
      this.$router.push({ name: key }); // 根据路由名称跳转
    },
  },
};
</script>

<style scoped>
.user-edit-container {
  display: flex;
  height: 100vh;
  background-color: #f9f9f9;
}

/* 左侧导航栏样式 */
.sidebar {
  width: 200px;
  background-color: #fff;
  border-right: 1px solid #ebebeb;
  padding: 20px;
}

.sidebar-title {
  font-size: 18px;
  font-weight: bold;
  color: #ff4d4f;
  margin-bottom: 20px;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-list li {
  font-size: 14px;
  color: #333;
  padding: 10px 0;
  cursor: pointer;
  transition: color 0.3s, background-color 0.3s;
}

.nav-list li:hover {
  color: #ff4d4f;
}

.nav-list li.active {
  color: #ff4d4f;
  font-weight: bold;
}

/* 右侧内容区域样式 */
.content {
  flex: 1;
  padding: 20px;
}
</style>