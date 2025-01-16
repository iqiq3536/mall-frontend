<template>
  <div>
    <h1>订单详情</h1>
    <table>
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
        <td>{{ orderDetail.name }}</td>
        <td><img :src="orderDetail.img_url" alt="product image" width="50" height="50"></td>
        <td>{{ orderDetail.quantity }}</td>
        <td>{{ orderDetail.total_price }}</td>
        <td>{{ orderDetail.create_at }}</td>
        <td>{{ orderDetail.last_update_at }}</td>
        <td>{{ orderDetail.shipping_status }}</td>
        <td>{{ orderDetail.order_detail_status }}</td>
        <td>
          <button
              v-if="orderDetail.order_detail_status !== '未支付'"
              @click="requestRefund(orderDetail.order_detail_id)"
          >
            申请退款
          </button>
          <button
              v-if="orderDetail.order_detail_status === '已支付' && orderDetail.shipping_status !== '未发货'"
              @click="signReceipt(orderDetail.order_detail_id)"
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

export default {
  data() {
    return {
      order_details_list: [],
    };
  },
  created() {
    this.fetchOrderDetails();
  },
  methods: {
    fetchOrderDetails() {
      const orderId = this.$route.params.orderId;
      axios.get(`http://localhost:8081/api/order_details/getOrders_details_list/${orderId}`)
          .then(response => {
            this.order_details_list = response.data.order_details_list;
            this.order_details_list.forEach((orderDetail) => {
              this.fetchProductInfo(orderDetail.product_id, orderDetail);
            });
          })
          .catch(error => {
            console.error("Error fetching order details:", error);
          });
    },
    fetchProductInfo(productId, orderDetail) {
      axios.get(`http://localhost:8081/api/get_product/${productId}`)
          .then(response => {
            orderDetail.name = response.data.name;
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
        });
      }
    }
  }
};
</script>
