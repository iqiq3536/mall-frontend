<template>
  <div class="user-edit-container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h2 class="sidebar-title">账户管理</h2>
      <ul class="nav-list">
        <li>个人资料</li>
        <li  @click="edit_skip()">收货地址</li>
      </ul>
    </aside>

    <!-- 右侧内容区域 -->
    <main class="content">
      <div  class="profile-info-form">
        <h2 class="form-title">个人信息展示</h2>
        <div class="form-group">
          <label for="username">用户名:</label>
          <template v-if="!editing">{{ user.username }}</template>
          <input v-else type="text" v-model="user.username" id="username" class="form-control">
        </div>
        <div class="form-group">
          <label for="password">密码:</label>
          <template v-if="!editing">******</template>
          <input v-else type="password" v-model="user.password" id="password" class="form-control">
        </div>
        <div class="form-group">
          <label for="full_name">姓名:</label>
          <template v-if="!editing">{{ user.full_name }}</template>
          <input v-else type="text" v-model="user.full_name" id="full_name" class="form-control">
        </div>
        <div class="form-group">
          <label for="gender">性别:</label>
          <template v-if="!editing">{{ user.gender }}</template>
          <input v-else type="text" v-model="user.gender" id="gender" class="form-control">
        </div>
        <div class="form-group">
          <label for="email">邮箱:</label>
          <template v-if="!editing">{{ user.contact_info }}</template>
          <input v-else type="email" v-model="user.contact_info" id="email" class="form-control">
        </div>
        <div class="form-actions">
          <button v-if="editable && !editing" type="button" @click="editProfile" class="button primary">编辑</button>
          <div v-if="editing">
            <button type="button" @click="cancelEdit" class="button secondary">取消</button>
            <button type="button" @click="handleSubmit" class="button primary">保存修改</button>
          </div>
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
      newEmail: '',
      editable: true,
      editing: false,
      errorMessage: '',
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
    this.fetchUserData();
    /*if (this.$route.params.user_id) {
      this.fetchUserData(this.$route.params.user_id);
    } else {
      console.error('未找到user_id参数');
    }*/
  },
  methods: {
    edit_skip() {
      this.$router.push({ name: 'address'});
    },
     fetchUserData() {

       axios.get('http://localhost:8081/api/user/findUserById',
       {withCredentials: true})
           .then(response => {
             this.user.username = response.data.username; // 更新username属性
             this.user.gender = response.data.gender;
             this.user.password = response.data.password;
             this.user.contact_info = response.data.contact_info;
             this.user.family_id = response.data.family_id;
             this.user.full_name = response.data.full_name;
             this.user.user_id = response.data.user_id;
             this.user.family_name = response.data.family_name;
             this.user.contact_info = response.data.contact_info;
           }) .catch(error => {
         console.error('请求失败：', error);
       });
     },
    editProfile() {
      this.editing = true;
      // 保存用户原始信息，以便取消时恢复
      this.originalUser = { ...this.user };
    },
    cancelEdit() {
      this.editing = false;
      // 恢复用户原始信息
      this.user = { ...this.originalUser };
      this.errorMessage = '';
    },
    handleSubmit() {
      const updatedUser = {
        ...this.originalUser,
        username: this.user.username,
        email: this.user.email,
        password: this.user.password,
        full_name: this.user.full_name,
        gender: this.user.gender,
        // 其他属性保持不变
      };
      axios.post('http://localhost:8081/api/user/updateUserById', updatedUser)
          .then(response => {
            console.log('信息更新成功', response);
            this.editing = false; // 保存成功后取消编辑状态
            this.originalUser = { ...this.user }; // 更新 originalUser 为最新修改后的信息
          })
          .catch(error => {
            console.error('信息更新失败', error);
          });
    }
  }
};
</script>

<style scoped>
.user-edit-container {
  display: flex;
  height: 100vh;
  background-color: #f0f2f5;
  font-family: 'Arial', sans-serif;
}

/* 左侧导航栏样式 */
.sidebar {
  width: 220px;
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
  background-color: #f7f7f7;
  border-radius: 4px;
}

.nav-list li.active {
  color: #ff4d4f;
  font-weight: bold;
}

/* 右侧内容区域样式 */
.content {
  flex: 1;
  padding: 40px;
}

/* 个人信息表单样式 */
.profile-info-form {
  max-width: 600px;
  margin: 0 auto;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

.form-control {
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;
}

.form-control:focus {
  border-color: #3498db;
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.2);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.button.primary {
  background-color: #3498db;
  color: #fff;
}

.button.primary:hover {
  background-color: #2980b9;
}

.button.secondary {
  background-color: #e0e0e0;
  color: #333;
}

.button.secondary:hover {
  background-color: #d5d5d5;
}

.error-message {
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
</style>