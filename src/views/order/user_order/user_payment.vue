<template>
  <div>
    <h1>支付页面</h1>
    <!-- 显示总金额 -->
    <div>
      <p>总金额：{{ totalAmount }} 元</p>
    </div>
    <!-- 地址选择 -->
    <div>
      <label for="address">选择收货地址：</label>
      <select v-model="selectedAddress" id="address">
        <option v-for="address in addresses" :key="address.id" :value="address.id">
          {{ address.address }}
        </option>
      </select>
    </div>
    <!-- 支付方式选择 -->
    <div>
      <label for="paymentMethod">选择支付方式：</label>
      <select v-model="paymentMethod" id="paymentMethod">
        <option value="wechat">微信支付</option>
        <option value="alipay">支付宝支付</option>
      </select>
    </div>
    <!-- 提交支付 -->
    <div>
      <button @click="submitPayment">确认支付</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalAmount: this.$route.query.total_amount,  // 从路由中获取总金额
      orderId: this.$route.query.order_id,  // 从路由中获取订单 ID
      addresses: [],
      selectedAddress: null,
      paymentMethod: 'wechat'  // 默认选择微信支付
    };
  },
  created() {
    // 获取用户的收货地址列表
    this.fetchAddressList();
  },
  methods: {
    fetchAddressList() {
      const userId = 123;  // 假设 user_id 已通过某种方式获得
      axios.get('http://localhost:8081/api/address/get_address_list', {
        params: { user_id: userId }
      }).then(response => {
        this.addresses = response.data;
        // 默认选择第一个地址
        if (this.addresses.length > 0) {
          this.selectedAddress = this.addresses[0].id;
        }
      }).catch(error => {
        console.error('获取地址列表失败', error);
      });
    },
    submitPayment() {
      if (!this.selectedAddress) {
        alert('请选择收货地址');
        return;
      }

      //添加地址
      axios.post('http://localhost:8081/api/orders/pay', {
        order_id: this.orderId,
        shipping_address: this.selectedAddress,
      })
      //添加地址
      axios.post('http://localhost:8081/api/order_details/updateShopping_address', {
        order_id: this.orderId,
        shipping_address: this.selectedAddress,
      })

      // 调用支付接口（这里只是一个示例，实际支付接口需要根据支付平台实现）
      window.open('http://localhost:8081/api/alipay/pay', {
        order_id: this.orderId,
        total_amount: this.totalAmount,
        address_id: this.selectedAddress,
      })
    }
  }
};
</script>
