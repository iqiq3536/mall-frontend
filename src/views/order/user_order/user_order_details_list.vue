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
              @click="requestRefund(orderDetail.order_detail_id)"
              :disabled="orderDetail.order_detail_status !== '已支付'"
              :style="{ opacity: orderDetail.order_detail_status !== '已支付' ? 0.5 : 1 }"
          >
            申请退款
          </button>
          <button
              @click="signReceipt(orderDetail.order_detail_id)"
              :disabled="!(orderDetail.order_detail_status === '已支付' && orderDetail.shipping_status === '运输中')"
              :style="{ opacity: !(orderDetail.order_detail_status === '已支付' && orderDetail.shipping_status === '运输中') ? 0.5 : 1 }"
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
      orderDetail:{
        order_detail_id:"",
        order_id:"",
        product_id:"",
        quantity:"",
        unit_price:"",
        total_price:"",
        create_at:"",
        order_detail_status:"",
        shipping_status:"",
        last_update_at:"",
        merchant_id:"",
        user_id:"",
        shipping_address:"",
        orderNo:""
      }
    };
  },
  created() {
    this.fetchOrderDetails();
  },
  methods: {
    fetchOrderDetails() {
      const orderId = this.$route.query.orderId;
      axios.get(`http://localhost:8081/api/order_details/getOrder_details_list`,{params: {
          order_id: orderId
        }
      }).then(response => {
            this.order_details_list = response.data.map(orderDetail=>({...orderDetail}));
            this.order_details_list.forEach((orderDetail) => {
              this.fetchProductInfo(orderDetail.product_id, orderDetail);
            });
          })
          .catch(error => {
            console.error("Error fetching order details:", error);
          });
    },
    fetchProductInfo(productId, orderDetail) {
      const orderId = this.$route.query.orderId;
      axios.get(`http://localhost:8081/api/get_product}`,{params: {
          order_id: orderId
        }
      })
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
        console.log(orderDetailId);
        axios.put('http://localhost:8081/api/order_details/update_Onepaystatus', {
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
