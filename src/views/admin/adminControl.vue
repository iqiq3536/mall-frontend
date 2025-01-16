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
              <button @click="openEditModal(user)">修改</button>
              <button @click="deleteUser(user)">删除</button>
            </td>
          </tr>
          </tbody>

        </table>
    </div>
  </main>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>{{ modalType === 'edit' ? '修改用户信息' : '' }}</h3>
        <form  @submit.prevent="modalType === 'edit' ? saveUser() : addUser">
          <label>
            序号:
            <input type="text" v-model="currentUser.user_id" required />
          </label>
          <label>
            用户名:
            <input type="text" v-model="currentUser.username" required />
          </label>
          <label>
            密码:
            <input type="text" v-model="currentUser.password" required />
          </label>
          <label>
            姓名:
            <input type="text" v-model="currentUser.full_name" required />
          </label>
        <label>
          性别:
          <input type="text" v-model="currentUser.gender" required />
        </label>
        <label>
          邮箱:
          <input type="text" v-model="currentUser.contact_info" required />
        </label>
        <label>
          家庭序号:
          <input type="text" v-model="currentUser.family_id" required />
        </label>
        <label>
          家庭名字:
          <input type="text" v-model="currentUser.family_name" required />
        </label>
          <div class="modal-actions">
            <button type="submit">保存</button>
            <button type="button" @click="closeModal">取消</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'UserManagement',
  data() {
    return {
      users: [], // 用于存储用户数据的数组
      showModal: false, // 控制弹出框的显示与隐藏
      modalType: "",
      currentUser: {
        username: '',
        password: '',
        user_id: '',
        full_name: '',
        gender: '',
        contact_info: '',
        family_id: '',
        family_name: ''


      } // 初始化 u
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    // 假设在组件创建时从后端获取用户列表
    fetchUsers() {

      axios.get('http://localhost:8081/api/user/findAll') // 替换为实际的接口 URL
          .then(response => {
            this.users = response.data.map(address => ({
              ...address,
            }));
          })
          .catch(error => {
            console.error('获取用户列表失败:', error);
          })
    },
    openEditModal(user) {
      // 打开修改地址弹出框
      this.modalType = "edit";
      this.currentUser = {...user}; // 复制当前地址
      this.showModal = true;
    },
    closeModal() {
      // 关闭弹出框
      this.showModal = false;
    },
    saveUser() {
      // 保存修改的地址
      axios.post('http://localhost:8081/api/user/updateUserById', this.currentUser)
          .then(response => {
            if (response.status === 200) {
              // 请求成功
              console.log("用户信息更新成功：", response.data);
              this.closeModal();
              this.fetchUsers(); // 刷新地址列表
            } else {
              console.error("更新信息失败：", response.data);
            }
          })
          .catch((error) => {
            console.error("网络错误：", error);
            // 在这里可以添加适当的错误处理逻辑，比如提示用户网络错误
          });
    },
    // 删除用户的方法
    deleteUser(user) {
      axios
          .post("http://localhost:8081/api/user/deleteUser", {
            user_id: user.user_id,
          })
          .then(() => {
            this.fetchUsers(); // 刷新地址列表
          })
          .catch((error) => {
            console.error("删除用户失败：", error);
          });
    },
    addUser() {
    }
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
/*弹出框*/
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.modal-actions button {
  margin-left: 10px;
}
</style>



