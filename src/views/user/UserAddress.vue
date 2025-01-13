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
      <div v-if="activeItem === 'address'" class="password-change-form">
        <form @submit.prevent="addressChange">
      <table class="address-table">
        <thead>
        <tr>
          <th>地址ID</th>
          <th>省</th>
          <th>市</th>
          <th>区（县）</th>
          <th>详细地址</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(address, index) in userAddresses" :key="index">
          <td>{{ address.address_id }}</td>
          <td>{{ address.province }}</td>
          <td>{{ address.city }}</td>
          <td>{{ address.district }}</td>
          <td>{{ address.detail }}</td>
          <td>
            <button @click="modifyAddress(address)">修改</button>
            <button @click="deleteAddress(address)">删除</button>
          </td>
        </tr>
        </tbody>
      </table>
      <button @click="addAddress">新增地址</button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
//import axios from "axios";

export default {
  data() {
    return {
      activeItem: 'profile', // 假设这是从父组件传递来的
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
    addressChange(){

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