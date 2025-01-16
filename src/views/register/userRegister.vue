<template>
  <div class="register-container">
    <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" autocomplete="off" placeholder="请输入用户名"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" autocomplete="off" placeholder="请输入密码"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword" autocomplete="off" placeholder="请确认密码"></el-input>
      </el-form-item>

      <el-form-item label="真名" prop="full_name">
        <el-input v-model="form.full_name" autocomplete="off" placeholder="请输入真名"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="form.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="邮箱" prop="contact_info">
        <el-input v-model="form.contact_info" autocomplete="off" placeholder="请输入邮箱"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';
import { Message } from 'element-ui';

export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        full_name: '',  // 修改为 full_name
        gender: '',
        contact_info: '',  // 修改为 contact_info
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: this.validateConfirmPassword, trigger: 'blur' }
        ],
        full_name: [{ required: true, message: '请输入真名', trigger: 'blur' }],
        gender: [{ required: true, message: '请选择性别', trigger: 'change' }],
        contact_info: [  // 修改为 contact_info
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // 自定义确认密码校验
    validateConfirmPassword(rule, value, callback) {
      if (value !== this.form.password) {
        callback(new Error('两次密码输入不一致'));
      } else {
        callback();
      }
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // 发送请求到后端
          this.registerUser();
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    registerUser() {
      const userData = {
        username: this.form.username,
        password: this.form.password,
        full_name: this.form.full_name,
        gender: this.form.gender,
        contact_info: this.form.contact_info
      };

      const url = 'http://localhost:8081/api/user/addUser';

      axios.post(url, userData)
          .then(response => {
            // 先检查后端返回的数据结构
            if (response.data && response.data.success) {
              // 如果注册成功
              Message.success(response.data.message || '注册成功');
            } else {
              // 如果注册失败，显示后端返回的具体错误信息
              Message.error(response.data.message || '注册失败');
            }
          })
          .catch(error => {
            // 捕获请求过程中可能的错误
            if (error.response) {
              // 如果响应错误，输出详细错误信息
              console.error('响应错误:', error.response.data);
              Message.error(error.response.data.message || '服务器错误，请稍后再试');
            } else if (error.request) {
              // 如果没有收到响应
              console.error('请求错误:', error.request);
              Message.error('网络错误，请稍后再试');
            } else {
              // 其他错误
              console.error('其他错误:', error.message);
              Message.error('发生未知错误，请稍后再试');
            }
          });


    }
  }
};
</script>

<style scoped>
.register-container {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
}
</style>

