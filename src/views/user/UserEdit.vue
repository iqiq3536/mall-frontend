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
      <!-- 密码修改表单 -->
      <div v-if="activeItem === 'EditUser'" class="password-change-form">
        <h2 class="form-title">密码修改</h2>
        <form @submit.prevent="handlePasswordChange">
          <div class="form-group">
            <label for="currentPassword">当前密码</label>
            <input
                type="password"
                id="currentPassword"
                v-model="passwordForm.currentPassword"
                class="form-control"
                placeholder="请输入当前密码"
                required
            />
          </div>
          <div class="form-group">
            <label for="newPassword">新密码</label>
            <input
                type="password"
                id="newPassword"
                v-model="passwordForm.newPassword"
                class="form-control"
                placeholder="请输入新密码"
                required
            />
          </div>
          <div class="form-group">
            <label for="confirmPassword">确认新密码</label>
            <input
                type="password"
                id="confirmPassword"
                v-model="passwordForm.confirmPassword"
                class="form-control"
                placeholder="请再次输入新密码"
                required
            />
          </div>
          <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>
          <button type="submit" class="submit-button">确认修改</button>
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
      activeItem: "profile", // 默认选中项
      navItems: [
        {key: "EditUser", label: "安全管理"},
        {key: "profile", label: "个人资料"},
        {key: "address", label: "收货地址"},
      ],
      passwordForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      user: {
        /*    private int user_id;
    private String username;
    private String password;
    private String full_name;
    private String gender;
    private String contact_info;
    private int family_id;
    private String family_name;
*/
        username: '',
        password: '',
        user_id:'',
        full_name:'',
        gender:'',
        contact_info:'',
        family_id:'',
        family_name:''


      }, // 初始化 user 对象为空
      errorMessage: "", // 存储错误消息
    };
  },
  created() {
    if (this.$route.params.user_id) {
      this.getUserInfo(this.$route.params.user_id);
    } else {
      console.error('未找到user_id参数');
    }
  },
  methods: {
    getUserInfo() {
      axios.post('http://localhost:8081/api/user/findUserById', {
        user_id: this.$route.params.user_id
      })
          .then(response => {
            this.user.user_id = response.data.user_id;
            this.user.username = response.data.username; // 更新username属性
            this.user.gender = response.data.gender;
            this.user.contact_info = response.data.contact_info;
            this.user.family_id = response.data.family_id;
            this.user.family_name = response.data.family_name;
            this.user.contact_info = response.data.contact_info;
            this.user.password = response.data.password;
          })
          .catch(error => {
            console.error('请求失败：', error);
          });
    },
    handleNavClick(key) {
      this.activeItem = key;
      this.$router.push({name: key}); // 根据路由名称跳转
    },
    handlePasswordChange() {
      const {currentPassword, newPassword, confirmPassword} = this.passwordForm;
// 验证当前密码是否为空
      if (!currentPassword) {
        this.errorMessage = "请输入当前密码！";
        return;
      }
      if (currentPassword !== this.user.password) {
        this.errorMessage = "密码不正确，请重新输入";
        return;
      }
      // 验证新密码和确认密码是否一致
      if (newPassword !== confirmPassword) {
        this.errorMessage = "新密码和确认新密码不一致，请重新输入";
        return;
      }

      // 调用后端接口的位置
      this.errorMessage = ""; // 清空错误消息
      const userPayload = {
        username: this.user.username,
        user_id:this.user.user_id,
        full_name:this.user.full_name,
        gender:this.user.gender,
        contact_info:this.user.contact_info,
        family_id:this.user.family_id,
        family_name:this.user.family_name,
        password: newPassword, // 将新密码更新到用户信息中
      };
      console.log("调用后端接口修改密码", {
        currentPassword,
        newPassword,
      });


        // 调用后端接口
        axios.post("http://localhost:8081/api/user/updateUserById", userPayload)
      .then(response => {
          const data = response.data;
        if ( data === true) {
          // 修改成功
          alert("密码修改成功！");
          // 清空表单
          this.passwordForm.currentPassword = "";
          this.passwordForm.newPassword = "";
          this.passwordForm.confirmPassword = "";
        } else {
          // 修改失败
          this.errorMessage = "密码修改失败，请重试！";
        }
      })
             .catch (error=> {
        // 后端返回异常或请求失败
        console.error("请求失败：", error);
        this.errorMessage = "请求失败，请稍后重试！";
      });
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