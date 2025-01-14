<template>
  <div class="user-edit-container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h2 class="sidebar-title"> 用户管理</h2>
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
      <div v-if="activeItem === 'profile'" class="profile-info-form">
        <h2 class="form-title">个人信息展示</h2>
        <div class="form-group">
          <label for="username">用户名:</label>
          <input type="text" v-model="user.username" id="username" disabled>
        </div>
        <div class="form-group">
          <label for="email">邮箱:</label>
          <input type="email" v-model="user.contact_info" id="email" disabled>
        </div>
        <div class="form-group" v-if="editable">
          <button type="button" @click="editProfile">编辑</button>
        </div>
        <div v-if="editing">
          <div class="form-group">
            <label for="newEmail">新邮箱:</label>
            <input type="email" v-model="newEmail" id="newEmail">
          </div>
          <button type="button" @click="cancelEdit">取消</button>
          <button type="button" @click="handleSubmit">保存修改</button>
        </div>
        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeItem: 'profile',
      newEmail: '',
      editable: true,
      editing: false,
      errorMessage: '',
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
  created() {
    if (this.$route.params.user_id) {
      this.fetchUserData(this.$route.params.user_id);
    } else {
      console.error('未找到user_id参数');
    }
  },
  methods: {
    handleNavClick(key) {
      this.activeItem = key;
      this.$router.push({ name: key, params: { user_id: this.user.user_id } });
    },
     fetchUserData() {

       axios.post('http://localhost:8081/api/user/findUserById', {
         user_id: this.$route.params.user_id
       })
           .then(response => {
             this.user.username = response.data.username; // 更新username属性
             this.user.gender = response.data.gender;
             this.user.contact_info = response.data.contact_info;
             this.user.family_id = response.data.family_id;
             this.user.user_id = response.data.user_id;
             this.user.family_name = response.data.family_name;
             this.user.contact_info = response.data.contact_info;
           }) .catch(error => {
         console.error('请求失败：', error);
       });
     },
    editProfile() {
      this.editing = true;
      this.newEmail = this.user.email; // 初始化新邮箱为当前邮箱
    },
    cancelEdit() {
      this.editing = false;
      this.newEmail = '';
      this.errorMessage = '';
    },
     handleSubmit() {
       axios.post('http://localhost:8081/api/user/findUserById', {
         user:this.user,
       })
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