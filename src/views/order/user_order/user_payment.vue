<template>
  <div class="payment-page">
    <!-- 顶部导航栏 -->
    <NavigationBar></NavigationBar>
    <h1 class="title">支付页面</h1>
    <!-- 显示总金额 -->
    <div class="total-amount">
      <p>总金额：{{ totalAmount }} 元</p>
    </div>
    <!-- 地址选择 -->
    <div class="address-select">
      <label for="address">选择收货地址：</label>
      <select v-model="selectedAddress" id="address">
        <option v-for="address in addresses" :key="address.address_id" :value="address.address_id">
          {{ getFullAddress(address) }}
        </option>
      </select>
    </div>
    <!-- 支付方式选择 -->
    <div class="payment-method">
      <label for="paymentMethod">选择支付方式：</label>
      <select v-model="paymentMethod" id="paymentMethod">
        <option value="wechat">微信支付</option>
        <option value="alipay">支付宝支付</option>
      </select>
    </div>
    <!-- 提交支付 -->
    <div class="submit-section">
      <button @click="submitPayment()" :class="{'button-clicked': isSubmitting}">
        确认支付
      </button>
    </div>
    <!-- 提示信息 -->
    <div v-if="paymentStatus" class="payment-status">
      <p>{{ paymentStatus }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  components: {NavigationBar},
  data() {
    return {
      totalAmount: this.$route.query.total_amount,  // 从路由中获取总金额
      orderId: this.$route.query.order_id,  // 从路由中获取订单 ID
      addresses: [],
      selectedAddress: null,
      paymentMethod: 'alipay',  // 默认选择支付宝支付
      isSubmitting: false,  // 提交按钮状态
      paymentStatus: '',  // 支付状态提示
    };
  },
  created() {
    // 获取用户的收货地址列表
    this.fetchAddressList();
  },
  methods: {
    fetchAddressList() {
      axios.get('http://localhost:8081/api/addresses/find', { withCredentials: true })
          .then(response => {
            this.addresses = response.data.map(contain => ({ ...contain }));
            if (this.addresses.length > 0) {
              this.selectedAddress = this.addresses[0].address_id;
            }
          })
          .catch(error => {
            console.error('获取地址列表失败', error);
          });
    },
    submitPayment() {
      if (!this.selectedAddress) {
        this.paymentStatus = '请选择收货地址';
        return;
      }

      // 找到选中的地址对象
      const selectedAddressObj = this.addresses.find(address => address.address_id === this.selectedAddress);
      if (!selectedAddressObj) {
        this.paymentStatus = '未找到对应的地址';
        return;
      }

      // 获取选中地址的拼接完整地址
      const fullAddress = this.getFullAddress(selectedAddressObj);

      this.isSubmitting = true;
      this.paymentStatus = '正在提交支付...';

      // 添加地址
      axios.post('http://localhost:8081/api/orders/updateShopping_address', {
        order_id: this.orderId,
        shipping_address: fullAddress,
      })
          .then(() => {
            axios.post('http://localhost:8081/api/order_details/updateShopping_address', {
              order_id: this.orderId,
              shipping_address: fullAddress,
            })
                .then(() => {
                  // 调用支付接口
                  window.open(`http://localhost:8081/alipay/pay?order_id=${this.orderId}&total_amount=${this.totalAmount}&shipping_address=${fullAddress}`);
                  this.$router.push({ name: 'user_order_list' });
                  this.paymentStatus = '支付请求已发送，正在跳转...';
                })
                .catch(() => {
                  this.paymentStatus = '支付请求失败，请稍后再试。';
                });
          })
          .catch(() => {
            this.paymentStatus = '更新地址失败，请稍后再试。';
          })
          .finally(() => {
            this.isSubmitting = false;
          });
    },
    getFullAddress(address) {
      // 拼接地址
      return `${address.province}${address.city}${address.county}${address.detailed_address}`;
    }
  }
};
</script>

<style scoped>
.payment-page {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f9f9f9;
}

.title {
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

.total-amount {
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
}

.address-select,
.payment-method {
  margin-bottom: 20px;
}

label {
  font-size: 16px;
  color: #555;
  margin-right: 10px;
}

select {
  font-size: 16px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

.submit-section {
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #4CAF50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.button-clicked {
  background-color: #ddd;
}

.payment-status {
  text-align: center;
  margin-top: 20px;
  font-size: 16px;
  color: #FF5722;
}
</style>
