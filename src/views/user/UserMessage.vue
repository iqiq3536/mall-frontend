<template>
  <div>
    <NavigationBar></NavigationBar>
  <div class="user-profile">
    <div class="user-info">
      <div class="user-name">{{ user.username}}</div>

      <button @click="editProfile" class="edit-profile-btn">编辑资料</button>
    </div>
    <div class="order-buttons">
      <router-link v-for="(order, index) in orders" :key="index" :to="`/orders/${order.label.toLowerCase()}`" class="order-button">
        <span>{{ order.label }}</span>
        <span class="order-count">{{ order.count }}</span>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";
import NavigationBar from "@/components/NavigationBar.vue";
//import Cookies from 'js-cookie';
export default {
  components: {NavigationBar},
  data() {
    return {

      orders: [
        { label: '代付款', count: 0 },
        { label: '代发货', count: 0 },
        { label: '待收货', count: 0 },
        { label: '待评价', count: 0 },
        { label: '退款收货', count: 0 }
      ],
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


      } // 初始化 user 对象为空
    };
  },
  created() {
    this.getUserInfo();
    //this.test();
    //console.error('未er_id参数');
    /*if (this.$route.params.user_id) {

      //this.getUserInfo(this.$route.params.user_id);
      /*this.getUserInfo(Cookies.get('user_id'));
    } else {
      console.error('未找到user_id参数');
    }*/
  },
  methods: {
    //test() {
    //  axios.get('http://localhost:8081/api/123', {withCredentials:true})

    getUserInfo() {
      //console.log('未找7889777777777777数');
      axios.get('http://localhost:8081/api/user/findUserById', {withCredentials: true})
          .then(response => {
            this.user.username = response.data.username; // 更新username属性
            this.user.gender = response.data.gender;
            this.user.user_id = response.data.user_id;
            this.user.contact_info = response.data.contact_info;
            this.user.family_id = response.data.family_id;
            this.user.family_name = response.data.family_name;
            this.user.contact_info = response.data.contact_info;
          })
          .catch(error => {
            console.error('请求失败：', error);
          });
    },
    editProfile() {
      this.$router.push({name: 'profile'});
    }
  }
}
</script>

<style>
.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info {
  margin-top: 20px;
  display: flex;
  align-items: center;
}

.user-name {
  font-size: 20px;
  font-weight: bold;
  margin-right: 10px;
}

.edit-profile-btn {
  background-color: #007bff;
  color: #fff;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}

.order-buttons {
  margin-top: 20px;
  display: flex;
}

.order-button {
  padding: 10px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.order-button:last-child {
  margin-right: 0;
}

.order-button:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>