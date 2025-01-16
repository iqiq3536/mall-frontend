<template>
  <div class="user-edit-container">
    <!-- 左侧导航栏 -->
    <aside class="sidebar">
      <h2 class="sidebar-title">账户管理</h2>
      <ul class="nav-list">
        <li @click="edit_skip()">个人资料</li>
        <li>收货地址</li>
      </ul>
    </aside>

    <!-- 右侧内容区域 -->
    <main class="content">
      <div class="password-change-form">
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
          <!--<tr v-for="address in userAddresses" :key="address.address_id">-->
          <tr v-for="(address, index) in userAddresses" :key="index">
            <td>{{ address.address_id }}</td>
            <td>{{ address.province }}</td>
            <td>{{ address.city }}</td>
            <td>{{ address.county }}</td>
            <td>{{ address.detailedAddress }}</td>
            <td>
              <button @click="openEditModal(address)">修改</button>
              <button @click="deleteAddress(address)">删除</button>
            </td>
          </tr>
          </tbody>
        </table>
        <button @click="openAddModal">新增地址</button>
      </div>
    </main>

    <!-- 弹出框 -->
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h3>{{ modalType === 'edit' ? '修改地址' : '新增地址' }}</h3>
        <form @submit.prevent="modalType === 'edit' ? saveAddress() : addAddress()">
          <label>
            省:
            <input type="text" v-model="currentAddress.province" required />
          </label>
          <label>
            市:
            <input type="text" v-model="currentAddress.city" required />
          </label>
          <label>
            区（县）:
            <input type="text" v-model="currentAddress.county" required />
          </label>
          <label>
            详细地址:
            <input type="text" v-model="currentAddress.detailedAddress" required />
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
  data() {
    return {
      user:{
        user_id:'',
      },
      userAddresses: [], // 存储用户地址列表
      showModal: false, // 控制弹出框的显示与隐藏
      modalType: "", // 弹出框类型: 'edit' 或 'add'
      currentAddress: {
        address_id: "",
        province: "",
        city: "",
        county: "",
        detailedAddress: "",
        user_id:""
      },
    };
  },
  created() {
    this.fetchAddresses();
  },
  methods: {
    fetchAddresses() {
      // 获取用户地址列表
      axios
          .get("http://localhost:8081/api/addresses/find",
      {withCredentials: true})
          .then((response) => {
            this.userAddresses = response.data.map(address => ({
              ...address,
             // isEditing: false,
          }));
            console.log(response.data)

          })
          .catch((error) => {
            console.error("Error fetching addresses:", error);
            // 可以在这里设置一些错误状态或显示错误消息
          });

    },
    openEditModal(address) {
      // 打开修改地址弹出框
      this.modalType = "edit";
      this.currentAddress = { ...address }; // 复制当前地址
      this.showModal = true;
    },
    openAddModal() {
      // 打开新增地址弹出框
      this.modalType = "add";
      this.currentAddress = {
        address_id: "",
        province: "",
        city: "",
        county: "",
        detailedAddress: "",
      };
      this.showModal = true;
    },
    closeModal() {
      // 关闭弹出框
      this.showModal = false;
    },
    saveAddress() {
      // 保存修改的地址
      axios
          .post("http://localhost:8081/api/addresses/update", this.currentAddress)
          .then((response) => {
            if (response.status === 200) {
              // 请求成功
              console.log("地址更新成功：", response.data);
              this.closeModal();
              this.fetchAddresses(); // 刷新地址列表
            } else {
              console.error("更新地址失败：", response.data);
            }
          })
          .catch((error) => {
            console.error("网络错误：", error);
            // 在这里可以添加适当的错误处理逻辑，比如提示用户网络错误
          });
    },
    deleteAddress(address) {
      // 删除地址
      axios
          .post("http://localhost:8081/api/addresses/delete", {
            address_id: address.address_id,
          })
          .then(() => {
            this.fetchAddresses(); // 刷新地址列表
          })
          .catch((error) => {
            console.error("删除地址失败：", error);
          });
    },
    addAddress() {
      // 新增地址
      axios
          .post("http://localhost:8081/api/addresses/add", {
            ...this.currentAddress,
          //  user_id: this.$route.params.user_id,
          },{withCredentials: true})
          .then(() => {
            this.closeModal();
            this.fetchAddresses(); // 刷新地址列表
          })
          .catch((error) => {
            console.error("新增地址失败：", error);
          });
    },
    edit_skip() {
      this.$router.push({ name: "profile" });
    },
  },
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

.address-table th,
.address-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

button {
  padding: 5px 10px;
  margin: 5px;
}

/* 弹出框样式 */
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