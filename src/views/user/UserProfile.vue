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
      <div v-if="activeItem === 'profile'" class="password-change-form">
        <h2 class="form-title">个人信息展示</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="username">用户名:</label>
            <input type="text" v-model="user.username" id="username" disabled>
          </div>
          <div class="form-group">
            <label for="email">邮箱:</label>
            <input type="email" v-model="user.email" id="email" disabled>
          </div>
          <!-- 如果需要修改密码或其他字段，可以添加更多的form-group -->
          <div class="form-group" v-if="editable">
            <button type="button" @click="editProfile">编辑</button>
          </div>
          <div v-if="editing">
            <div class="form-group">
              <label for="newEmail">新邮箱:</label>
              <input type="email" v-model="newEmail" id="newEmail">
            </div>
            <!-- 添加其他需要修改的字段 -->
            <button type="submit">保存修改</button>
            <button type="button" @click="cancelEdit">取消</button>
          </div>
          <div v-if="errorMessage" class="error" >
            {{ errorMessage }}
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeItem: 'profile', // 假设这是从父组件传递来的
      newEmail: '',
      editable: true, // 控制是否显示编辑按钮
      editing: false, // 控制是否处于编辑模式
      errorMessage: '',// 错误信息显示
      navItems: [
        { key: "EditUser", label: "安全管理" },
        { key: "profile", label: "个人资料" },
        { key: "address", label: "收货地址" },
      ],
      user: {

        username: '',
        password: '',
        user_id:'',
        full_name:'',
        gender:'',
        contact_info:'',
        family_id:'',
        family_name:''


      }
    };
  },
  methods: {
    handleNavClick(key) {
      this.activeItem = key;
      this.$router.push({ name: key }); // 根据路由名称跳转
    },
    async fetchUserData() {
      try {
        // 假设从某处获取了userId
        const userId = 1; // 这里应该根据实际情况获取或传递userId
        const response = await axios.get(`http://localhost:8081/api/user/findUserById?id=${userId}`);
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
        this.errorMessage = '无法加载用户信息，请稍后再试。';
      }
    },
    editProfile() {
      this.editing = true;
      this.newEmail = this.user.email; // 初始化新邮箱为当前邮箱
      // 禁用原始信息输入框
      const inputs = document.querySelectorAll('.form-group input[disabled]');
      inputs.forEach(input => input.removeAttribute('disabled'));
    },
    cancelEdit() {
      this.editing = false;
      this.newEmail = '';
      // 恢复原始信息输入框为禁用状态
      const inputs = document.querySelectorAll('.form-group input[type="text"], .form-group input[type="email"]');
      inputs.forEach(input => input.setAttribute('disabled', ''));
      this.errorMessage = '';
    },
    async handleSubmit() {
      try {
        // 这里应该添加验证逻辑
        const updatedUser = {
          ...this.user,
          email: this.newEmail
          // 添加其他需要更新的字段
        };
        // 发送更新请求到后端（这里假设有一个更新API）
        const response = await axios.put('http://localhost:8081/api/user/updateUser', updatedUser);
        // 更新本地用户数据（如果需要）
        this.user = response.data;
        this.cancelEdit(); // 保存后退出编辑模式
        this.errorMessage = '';
        // 可以添加成功提示
      } catch (error) {
        console.error('Error updating user data:', error);
        this.errorMessage = '保存失败，请稍后再试。';
      }
    }
  }
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


/* 密码修改表单样式 */
.password-change-form {
  max-width: 400px;
  margin: 0 auto;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 5px;
}

.form-control {
  width: 100%;
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  outline: none;
}

.form-control:focus {
  border-color: #ff4d4f;
  box-shadow: 0 0 3px rgba(255, 77, 79, 0.5);
}

.error-message {
  color: #ff4d4f;
  font-size: 12px;
  margin-bottom: 15px;
}

.submit-button {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  color: #fff;
  background-color: #ff4d4f;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #e33c3e;
}
</style>