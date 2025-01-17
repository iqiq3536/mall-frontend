<template>
  <div class="order-container">
    <!-- 顶部导航栏 -->
    <NavigationBar></NavigationBar>
    <h1>我的订单</h1>
    <table class="order-table">
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
        <td>
          <button class="detail-button" @click="viewDetails(order.order_id)">查看详情</button>
          <button
              class="pay-button"
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
import NavigationBar from "@/components/NavigationBar.vue";

export default {
  components: { NavigationBar },
  data() {
    return {
      orders_list: [],
      order: {
        order_id: "",
        user_id: "",
        order_status: "",
        create_at: "",
        total_amount: "",
        payment_method: "",
        shipping_address: ""
      }
    };
  },
  mounted() {
    console.log("Component created!");
    this.fetchOrdersList();
  },
  methods: {
    fetchOrdersList() {
      axios.get(`http://localhost:8081/api/orders/getOrders_list`, { withCredentials: true })
          .then(response => {
            console.log("Fetched Orders List:", response.data.orders_list);
            this.orders_list = response.data.map(order => ({ ...order }))
          })
          .catch(error => {
            console.error("Error fetching orders list:", error);
          });
    },
    viewDetails(orderId) {
      this.$router.push({ name: 'user_order_details_list', query: { orderId } });
    },
    Pay(orderId, total_amount) {
      this.$router.push({ name: 'userPayment', query: { order_id: orderId, total_amount: total_amount } });
      alert(`您已支付订单 ${orderId}，金额：${total_amount}`);
    }
  }
};
</script>

<style scoped>
/* 全局容器样式 */
.order-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* 表格样式 */
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-table th,
.order-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ccc;
}

.order-table th {
  background-color: #f4f4f4;
}

/* 按钮样式 */
button {
  padding: 8px 15px;
  margin: 5px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s, opacity 0.3s;
}

.detail-button {
  background-color: #4CAF50;
  color: white;
}

.pay-button {
  background-color: #FF5722;
  color: white;
}

button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

/* 标题样式 */
h1 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

/* 表格容器样式 */
.order-table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.order-table th {
  background-color: #f2f2f2;
}

/* 响应式样式 */
@media screen and (max-width: 768px) {
  .order-table th, .order-table td {
    font-size: 12px;
  }

  button {
    padding: 6px 12px;
  }
}
</style>
