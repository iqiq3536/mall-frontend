<template>
  <div class="order-details">
    <!-- 顶部导航栏 -->
    <NavigationBar></NavigationBar>
    <h1>订单详情</h1>
    <table class="order-table">
      <thead>
      <tr>
        <th>订单编号</th>
        <th>产品名称</th>
        <th>图片</th>
        <th>数量</th>
        <th>总金额</th>
        <th>创建时间</th>
        <th>最后更新时间</th>
        <th>运输状态</th>
        <th>订单状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="orderDetail in order_details_list" :key="orderDetail.order_detail_id">
        <td>{{ orderDetail.orderNo }}</td>
        <td>{{ orderDetail.product_name }}</td>
        <td><img :src="orderDetail.img_url" alt="product image" class="product-image"></td>
        <td>{{ orderDetail.quantity }}</td>
        <td>{{ orderDetail.total_price }}</td>
        <td>{{ orderDetail.create_at }}</td>
        <td>{{ orderDetail.last_update_at }}</td>
        <td>{{ orderDetail.shipping_status }}</td>
        <td>{{ orderDetail.order_detail_status }}</td>
        <td>
          <button
              @click="requestRefund(orderDetail.order_detail_id)"
              :disabled="orderDetail.order_detail_status !== '已支付'"
              :class="{ 'disabled-button': orderDetail.order_detail_status !== '已支付' }"
          >
            申请退款
          </button>
          <button
              @click="signReceipt(orderDetail.order_detail_id)"
              :disabled="!(orderDetail.order_detail_status === '已支付' && orderDetail.shipping_status === '运输中')"
              :class="{ 'disabled-button': !(orderDetail.order_detail_status === '已支付' && orderDetail.shipping_status === '运输中') }"
          >
            签收
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
      order_details_list: [],
      orderDetail: {
        order_detail_id: "",
        order_id: "",
        product_id: "",
        product_name: "",
        quantity: "",
        unit_price: "",
        total_price: "",
        create_at: "",
        order_detail_status: "",
        shipping_status: "",
        last_update_at: "",
        merchant_id: "",
        user_id: "",
        shipping_address: "",
        orderNo: ""
      }
    };
  },
  created() {
    this.fetchOrderDetails();
  },
  methods: {
    fetchOrderDetails() {
      const orderId = this.$route.query.orderId;
      axios.get(`http://localhost:8081/api/order_details/getOrder_details_list`, { params: { order_id: orderId } })
          .then(response => {
            this.order_details_list = response.data.map(orderDetail => ({ ...orderDetail }));
            this.order_details_list.forEach(orderDetail => {
              this.fetchProductInfo(orderDetail.product_id, orderDetail);
            });
          })
          .catch(error => {
            console.error("Error fetching order details:", error);
          });
    },
    fetchProductInfo(productId, orderDetail) {
      axios.get(`http://localhost:8081/api/get_product`, { params: { product_id: productId } })
          .then(response => {
            orderDetail.product_name = response.data.name;
            orderDetail.img_url = response.data.img_url;
          })
          .catch(error => {
            console.error("Error fetching product info:", error);
          });
    },
    requestRefund(orderDetailId) {
      if (confirm('确认申请退款吗？')) {
        axios.put(`http://localhost:8081/api/order_details/update_Onepaystatus`, {
          order_detail_status: '申请退款',
          order_detail_id: orderDetailId
        }).then(() => {
          this.fetchOrderDetails();
          alert('退款申请已提交！');
        }).catch(() => {
          alert('退款申请失败，请稍后再试。');
        });
      }
    },
    signReceipt(orderDetailId) {
      if (confirm('确认签收吗？')) {
        axios.put(`http://localhost:8081/api/order_details/update_Oneshipstatus`, {
          shipping_status: '已签收',
          order_detail_id: orderDetailId
        }).then(() => {
          this.fetchOrderDetails();
          alert('签收成功！');
        }).catch(() => {
          alert('签收失败，请稍后再试。');
        });
      }
    }
  }
};
</script>

<style scoped>
/* 页面容器 */
.order-details {
  padding: 20px;
  font-family: Arial, sans-serif;
}

/* 表格样式 */
.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.order-table th, .order-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.order-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

/* 产品图片 */
.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

/* 按钮样式 */
button {
  padding: 10px 20px;
  margin: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #45a049;
}

/* 禁用按钮样式 */
.disabled-button {
  opacity: 0.5;
}
</style>
