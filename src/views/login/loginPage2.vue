<template>
  <div class="box">
    <span class="borderLine"></span>
    <el-form ref="loginForm2" :model="loginForm2" :rules="rules" label-width="0px" class="login-form">
    <h2>登录</h2>
      <div class="inputBox">
        <input type="text" id="username" v-model="loginForm2.username" required>
        <span>用户名</span><i></i>
      </div>
      <div class="inputBox">
        <input type="password" id="password" v-model="loginForm2.password" required>
        <span>密码</span><i></i>
      </div>
      <div class="links">
        <a>密码找回</a>
        <a>注册</a>
      </div>
      <button @click="submitForm2('loginForm2')" value="登录"/>
      </el-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      loginForm2: {
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
    submitForm2(formName) {
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
      axios.post('http://localhost:8081/api/login', {
        username: this.loginForm2.username,
        password: this.loginForm2.password
      })
          .then(response => {
            if (response.data.success) {
              this.$router.push({ name: 'Goods' });
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
*{
  margin: 0;
  padding: 0;
  font-size: white;
  box-sizing: border-box;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none; /* Standard */
}
body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #ffe0c8;
}
.box {
  position: relative;
  width: 380px;
  height: 560px;
  border-radius: 8px;
  box-sizing: 80%;
}
.box form {
  position: absolute;
  inset: 4px;
  background: #ffffff;
  padding: 50px 40px;
  border-radius: 8px;
  z-index: 2;
  display: flex;
  flex-direction: column;
}
.box form h2 {
  color: rgb(0, 0, 0);
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.1em;
}
.box form .inputBox {
  position: relative;
  width: 300px;
  margin-top: 35px;

}
.box form .inputBox input{
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  outline: none;
  border: none;
  box-shadow: none;
  color: #ffffff;
  font-size: 1em;
  letter-spacing: 0.05em;
  z-index: 10;
}
.box form .inputBox vlg {
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  pointer-events: none;
  letter-spacing: 0.05em;
  color: rgb(0, 0, 0);
  font-size: 0.75em;
  transform: translateY(-34px);
}

.box form .inputBox span {
  position: absolute;
  left: 0;
  padding: 20px 0px 10px;
  pointer-events: none;
  color:#1e1e1e;
  font-size: 1em;
  letter-spacing: 0.05em;
}
.box form .inputBox input {
  transition: 0.5s;
}
.box form .inputBox span {
  transition: 0.5s;
}
.box form .inputBox input:valid ~ span,
.box form .inputBox input:focus ~ span{
  color: rgb(0, 0, 0);
  font-size: 0.75em;
  transform: translateY(-34px);
}
.box form .inputBox valk {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 44px;
  background: rgb(0, 0, 0);
  border-radius: 4px;
  overflow: hidden;
  transition: 0.5s;
  pointer-events: none;
}
.box form .inputBox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: rgb(255, 174, 0);
  border-radius: 4px;
  overflow: hidden;
  transition: 0.5s;
  pointer-events: none;
}
.box form .inputBox input:valid ~ i,
.box form .inputBox input:focus ~ i{
  height: 44px;
}
.box form .links {
  display: flex;
  justify-content: space-between;
}
.box form .links a {
  margin: 10px 0;
  font-size: 0.75em;
  color: #757575;
  text-decoration: none;
}
.box form .links a:hover,
.box form .links a:nth-child(2){
  color: rgb(0, 0, 0);
}
.box form input[type="submit"] {
  border: none;
  outline: none;
  padding: 9px 25px;
  color : white;
  background: rgb(0, 0, 0);
  cursor: pointer;
  font-size: 0.9em;
  border-radius: 4px;
  font-weight: 600;
  width: 100px;
  margin-top: 10px;
}
.box form input[type="submit"]:active {
  opacity: 0.8;
}
.borderLine{
  position: absolute;
  top: 0;
  inset: 0;
}
@keyframes animate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.box{
  overflow: hidden;
}


</style>
