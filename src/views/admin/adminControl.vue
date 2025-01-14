<template>
  <div>
  <nav class="navbar">
    <div class="navbar-left">
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/adminControl" class="navbar-link">用户管理</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/sellerControl" class="navbar-link">商家管理</router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-right">
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/cart" class="navbar-link">商品管理</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="" class="navbar-link">我的</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <main class="content">
    <div  class="password-change-form">
      <form @submit.prevent="addressChange">
        <table class="address-table">
          <thead>
          <tr>
            <th>用户ID</th>
            <th>用户名</th>
            <th>姓名</th>
            <th>性别</th>
            <th>联系方式</th>
            <th>家庭ID</th>
            <th>家庭名车</th>
            <th>操作</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.user_id }}</td> <!-- 假设用户ID的属性名是 user_id -->
            <td>{{ user.username }}</td> <!-- 假设用户名的属性名是 username -->
            <td>{{ user.full_name }}</td> <!-- 假设姓名的属性名是 name -->
            <td>{{ user.gender }}</td> <!-- 假设性别的属性名是 gender -->
            <td>{{ user.contact_info }}</td> <!-- 假设联系方式的属性名是 contact -->
            <td>{{ user.family_id }}</td><!-- 注意：家庭ID这一列可能需要根据您的实际数据模型进行调整 -->
            <td>{{ user.family_name }}</td>
            <td>
              <button @click="modifyUser(user)">修改</button>
              <button @click="deleteUser(user)">删除</button>
            </td>
          </tr>
          </tbody>

        </table>
        <button @click="addUser">新增用户</button>
      </form>
    </div>
  </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'UserManagement',
  data() {
    return {
      users: [], // 用于存储用户数据的数组
      // 可能还需要其他数据属性，如新用户表单的数据等
    };
  },
  methods: {
    // 假设在组件创建时从后端获取用户列表
    fetchUsers() {
      // 使用 axios 或其他 HTTP 客户端发送 GET 请求到后端接口
      axios.get('/api/users') // 替换为实际的接口 URL
          .then(response => {
            this.users = response.data; // 假设后端返回的数据在 response.data 中
          })
          .catch(error => {
            console.error('获取用户列表失败:', error);
          });
    },
    // 修改用户信息的方法
    modifyUser(user) {
      // 这里应该有一个表单或对话框让用户输入新信息
      // 然后使用 axios 发送 PUT 请求到后端接口，如 /api/users/{id}
      axios.put(`/api/users/${user.user_id}`, {
        // 这里放置要更新的用户信息，根据后端 API 的要求构造请求体
        username: user.username,
        full_name: user.full_name,
        gender: user.gender,
        contact_info: user.contact_info,
        // ... 其他需要更新的字段
      })
          .then(() => {
            // 更新成功后可能需要刷新用户列表或显示成功消息
            this.fetchUsers(); // 示例：重新获取用户列表以更新显示
          })
          .catch(error => {
            console.error('修改用户失败:', error);
          });
    },
    // 删除用户的方法
    deleteUser(user) {
      axios.delete(`/api/users/${user.user_id}`) // 替换为实际的删除用户接口 URL
          .then(() => {
            // 从用户列表中移除已删除的用户
            this.users = this.users.filter(u => u.user_id !== user.user_id);
            // 显示成功消息（可选）
          })
          .catch(error => {
            console.error('删除用户失败:', error);
          });
    },
    // 新增用户的方法
    addUser() {
      // 这里应该有一个表单让用户输入新用户信息
      // 然后使用 axios 发送 POST 请求到后端接口，如 /api/users
      axios.post('/api/users', {
        // 这里放置新用户信息，根据后端 API 的要求构造请求体
        username: '',
        full_name: '',
        gender: '',
        contact_info: '',
        // ... 其他必填字段
      })
          .then(response => {
            // 新增成功后将新用户添加到用户列表或显示成功消息
            this.users.push(response.data); // 假设后端返回了新用户数据
          })
          .catch(error => {
            console.error('新增用户失败:', error);
          });
    },
  },
  // 生命周期钩子，组件创建时获取用户列表
  created() {
    this.fetchUsers();
  },
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
.content {
  flex: 1;
  padding: 20px;
}
.address-table {
  width: 100%;
  border-collapse: collapse;
}

.address-table th, .address-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

button {
  padding: 5px 10px;
  margin: 5px;
}
</style>



