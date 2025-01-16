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

      <el-form-item label="验证码" prop="captcha">
        <el-input v-model="form.captcha" autocomplete="off" placeholder="请输入验证码"></el-input>
        <el-button
            :disabled="isButtonDisabled"
            @click="sendCaptcha"
            type="text">
          {{ countdown > 0 ? countdown + '秒后重发' : '获取验证码' }}
        </el-button>
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
        full_name: '',
        gender: '',
        contact_info: '',
        captcha: '',  // 添加验证码字段
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
        contact_info: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }
        ],
        captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
      isButtonDisabled: false,  // 控制按钮是否禁用
      countdown: 0,  // 倒计时秒数
      countdownTimer: null,  // 保存倒计时的定时器
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
    sendCaptcha() {
      // 禁用按钮并开始倒计时
      this.isButtonDisabled = true;
      this.countdown = 60;  // 设置倒计时为60秒
      this.countdownTimer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;  // 倒计时减少
        } else {
          clearInterval(this.countdownTimer);  // 倒计时结束，清除定时器
          this.isButtonDisabled = false;  // 启用按钮
        }
      }, 1000);  // 每秒更新一次倒计时

      // 发送验证码请求
      axios.post('http://localhost:8081/api/user/sendEmail', {
        email: this.form.contact_info  // 确保传递了 email 参数
      })
          .then(response => {
            if (response.data.success) {
              Message.success('验证码已发送');
            } else {
              Message.error(response.data.message);
            }
          })
          .catch(() => {
            Message.error('验证码发送失败');
          });
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
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
        contact_info: this.form.contact_info,
      };

      const url = 'http://localhost:8081/api/user/addUser?captcha=' + this.form.captcha;

      axios.post(url, userData)
          .then(response => {
            if (response.data && response.data.success) {
              Message.success(response.data.message || '注册成功');
            } else {
              Message.error(response.data.message || '注册失败');
            }
          })
          .catch(() => {
            Message.error('服务器错误，请稍后再试');
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


