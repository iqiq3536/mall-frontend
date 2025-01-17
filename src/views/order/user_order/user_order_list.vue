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
        <td>{{ order.total_amount }}</td>
        <td>{{ order.create_at }}</td>
        <td>{{ order.shipping_address }}</td>
        <td>{{ order.payment_method }}</td>
        <td>{{ order.order_status }}</td>
        <td><button @click="viewDetails(order.order_id)">查看详情</button>
          <button
              @click="Pay(order.order_id, order.total_amount)"
              :disabled="order.order_status !== '未支付'"
              :style="{ opacity: order.order_status !== '未支付' ? 0.5 : 1 }">
            支付订单
          </button>
        </td>
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
      order:{
        order_id:"",
        user_id:"",
        order_status:"",
        create_at:"",
        total_amount:"",
        payment_method:"",
        shipping_address:""
      }
    };
  },
  mounted() {
    console.log("Component created!");
    this.fetchOrdersList();
  },
  methods: {
    fetchOrdersList() {
      //const userId = 1; // 假设用户ID是1
      axios.get(`http://localhost:8081/api/orders/getOrders_list`,{withCredentials: true})
          .then(response => {
            console.log("Fetched Orders List:", response.data.orders_list);
            this.orders_list = response.data.map(order=>({...order}))
          })
          .catch(error => {
            console.error("Error fetching orders list:", error);
          });
    },
    viewDetails(orderId) {
      this.$router.push({ name: 'user_order_details_list', query: { orderId } });
    },
    Pay(orderId,total_amount){
      this.$router.push({ name: 'user_payment', query: { order_id: orderId, total_amount: total_amount } });
    }
  }
};
</script>
