<template>
  <div class="order-details-container">
    <!-- 顶部导航栏 -->
    <NavigationBar></NavigationBar>
    <h1 class="order-title">商家订单详情</h1>
    <table class="order-table">
      <thead>
      <tr>
        <th>商品名称</th>
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
        <td>{{ orderDetail.name }}</td>
        <td><img :src="orderDetail.img_url" alt="product image" class="product-image"></td>
        <td>{{ orderDetail.quantity }}</td>
        <td>{{ orderDetail.total_price }}</td>
        <td>{{ orderDetail.create_at }}</td>
        <td>{{ orderDetail.last_update_at }}</td>
        <td>{{ orderDetail.shipping_status }}</td>
        <td>{{ orderDetail.order_detail_status }}</td>
        <td>
          <button
              v-if="orderDetail.order_detail_status === '申请退款'"
              @click="agreeRefund(orderDetail.order_detail_id)"
              class="action-btn refund-btn"
          >
            同意退款
          </button>
          <button
              v-if="orderDetail.order_detail_status === '已支付' && orderDetail.shipping_status === '未发货'"
              @click="shipOrder(orderDetail.order_detail_id)"
              class="action-btn ship-btn"
          >
            发货
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
  components: {NavigationBar},
  data() {
    return {
      order_details_list: [],
    };
  },
  created() {
    this.fetchMerchantOrderDetails();
  },
  methods: {
    fetchMerchantOrderDetails() {
      axios.get(`http://localhost:8081/api/order_details/getOrder_details_merchant_list`, { withCredentials: true })
          .then(response => {
            this.order_details_list = response.data;
            this.order_details_list.forEach((orderDetail) => {
              this.fetchProductInfo(orderDetail.product_id, orderDetail);
            });
          })
          .catch(error => {
            console.error("Error fetching merchant order details:", error);
          });
    },
    fetchProductInfo(productId, orderDetail) {
      axios.post(`http://localhost:8081/api/order_details/get_product`, { product_id: productId })
          .then(response => {
            orderDetail.name = response.data.name;
            orderDetail.img_url = response.data.img_url;
          })
          .catch(error => {
            console.error("Error fetching product info:", error);
          });
    },
    agreeRefund(orderDetailId) {
      if (confirm('确认同意退款吗？')) {
        axios.put(`http://localhost:8081/api/order_details/update_Onepaystatus`, {
          order_detail_status: '已退款',
          order_detail_id: orderDetailId
        }).then(() => {
          axios.put(`http://localhost:8081/api/order_details/update_Oneshipstatus`, {
            shipping_status: '已回仓',
            order_detail_id: orderDetailId
          }).then(() => {
            this.fetchMerchantOrderDetails();
            alert('退款已同意');
          });
        });
      }
    },
    shipOrder(orderDetailId) {
      if (confirm('确认发货吗？')) {
        axios.put(`http://localhost:8081/api/order_details/update_Oneshipstatus`, {
          shipping_status: '已发货',
          order_detail_id: orderDetailId
        }).then(() => {
          this.fetchMerchantOrderDetails();
          alert('订单已发货');
        });
      }
    }
  }
};
</script>

<style scoped>
.order-details-container {
  font-family: Arial, sans-serif;
  margin: 20px;
}

.order-title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.order-table th, .order-table td {
  padding: 12px;
  text-align: center;
  border: 1px solid #ddd;
}

.order-table th {
  background-color: #f4f4f4;
  color: #333;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.action-btn {
  padding: 8px 12px;
  font-size: 14px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}

.refund-btn {
  background-color: #f44336;
  color: white;
}

.ship-btn {
  background-color: #4CAF50;
  color: white;
}

.refund-btn:hover,
.ship-btn:hover {
  opacity: 0.8;
}
</style>
