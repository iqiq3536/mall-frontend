<template>
  <div>
    <h1>我的订单</h1>
    <table>
      <thead>
      <tr>
        <th>订单号</th>
        <th>总金额</th>
        <th>创建时间</th>
        <th>收货地址</th>
        <th>支付方式</th>
        <th>订单状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="order in orders_list" :key="order.order_id">
        <td>{{ order.order_id }}</td>
        <td>{{ order.total_cmount }}</td>
        <td>{{ order.created_at }}</td>
        <td>{{ order.shipping_address }}</td>
        <td>{{ order.pay_method }}</td>
        <td>{{ order.order_status }}</td>
        <td><button @click="viewDetails(order.order_id)">查看详情</button></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders_list: [],
    };
  },
  created() {
    this.fetchOrdersList();
  },
  methods: {
    fetchOrdersList() {
      const userId = 1; // 假设用户ID是1
      axios.get(`http://localhost:8081/api/orders/getOrders_list/${userId}`)
          .then(response => {
            this.orders_list = response.data.orders_list;
          })
          .catch(error => {
            console.error("Error fetching orders list:", error);
          });
    },
    viewDetails(orderId) {
      this.$router.push({ name: 'orderDetails', params: { orderId } });
    }
  }
};
</script>
