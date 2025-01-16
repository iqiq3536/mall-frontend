<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="rules" label-width="0px" class="login-form">
      <h2 class="login-title">用户登录</h2>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="用户名" prefix-icon="el-icon-user"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="密码" prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log('登录失败！');
          return false;
        }
      });
    },
    login() {
      axios.post('http://localhost:8081/api/login_user',{
        username: this.loginForm.username,
        password: this.loginForm.password
      }, {
        withCredentials: true
      }
      )
          .then(response => {
            if (response.data.success) {
              this.$router.push({ name: 'MallHomePage' });
            } else {
              this.$message.error('登录失败：' + response.data.message);
            }
          })
          .catch(error => {
            console.error('登录请求失败：', error);
            this.$message.error('登录请求失败，请稍后再试！');
          });
    }
  }
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #6a11cb, #2575fc);
}

.login-form {
  width: 300px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.login-form:hover {
  box-shadow: 0 6px 45px rgba(0, 0, 0, 0.2);
}

.login-title {
  color: #333;
  text-align: center;
  margin-bottom: 30px;
}

.el-button {
  width: 100%;
  margin-top: 20px;
}
</style>
