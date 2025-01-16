<template>
  <div>
    <h1>购物车</h1>
    <table border="1" width="100%">
      <thead>
      <tr>
        <th>
          <input type="checkbox" v-model="allSelected" @change="toggleAllSelection">
        </th>
        <th>名字</th>
        <th>类别</th>
        <th>图片</th>
        <th>商品单价</th>
        <th>购买商品数量</th>
        <th>创建日期</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <CartList
          v-for="(item, index) in cartDetails"
          :key="index"
          :item="item"
          :selected="item.selected"
          @update-quantity="updateQuantity"
          @delete-item="deleteItem"
          @select-item="selectItem"
      />
      </tbody>
    </table>

    <CartFooter
        :selected-count="selectedCount"
        :total-amount="totalAmount"
        @clear-all="clearAll"
        @order="order"
    />
  </div>
</template>

<script>
import CartList from '@/components/CartList.vue';
import CartFooter from '@/components/CartFooter.vue';
import axios from 'axios';

export default {
  components: {
    CartList,
    CartFooter
  },
  data() {
    return {
      cartDetails: [],
      allSelected: false
    };
  },
  computed: {
    selectedCount() {
      return this.cartDetails.filter(item => item.selected).length;
    },
    totalAmount() {
      return this.cartDetails.reduce((total, item) => {
        return item.selected ? total + (item.unit_price * item.quantity) : total;
      }, 0);
    }
  },
  methods: {
    fetchCartDetails() {
      axios.get('http://localhost:8081/api/SelectShopping_carts', {params: {user: 'user'}})
          .then(response => {
            const shopping_carts = response.data;
            return axios.get('http://localhost:8081/api/get_cart_details_list', {params: {shopping_carts}});
          })
          .then(response => {
            this.cartDetails = response.data.map(detail => {
              return {...detail, selected: false};
            });
          });
    },
    updateQuantity(item, quantity) {
      axios.post('http://localhost:8081/api/edit', {...item, quantity})
          .then(() => {
            item.quantity = quantity;
          });
    },
    deleteItem(item) {
      axios.post('http://localhost:8081/api/deleteOne', {cart_details_id: item.cart_details_id})
          .then(() => {
            this.cartDetails = this.cartDetails.filter(i => i.cart_details_id !== item.cart_details_id);
          });
    },
    selectItem(item) {
      item.selected = !item.selected;
    },
    toggleAllSelection() {
      this.cartDetails.forEach(item => {
        item.selected = this.allSelected;
      });
    },
    clearAll() {
      axios.post('http://localhost:8081/api/deleteAll', {shopping_carts: 'shopping_carts'})
          .then(() => {
            this.cartDetails = [];
          });
    },
    order() {
      // 获取已选中的商品
      const selectedItems = this.cartDetails.filter(item => item.selected);
      // 计算总金额
      const totalAmount = this.totalAmount;
      // 获取用户ID (假设 user_id 已通过某种方式获得)
      const userId = 123; // 替换为实际的 user_id
      // 第一步：创建订单
      axios.post('http://localhost:8081/api/orders/insertOrders', {
        user_id: userId,
        total_amount: totalAmount
      }).then(response => {
        const orderId = response.data.order_id;
        // 第二步：提交订单详情
        const orderDetailsPromises = selectedItems.map(item => {
          const totalPrice = item.unit_price * item.quantity;

          // 构建订单详情对象
          const orderDetails = {
            order_id: orderId,
            user_id:userId,
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: totalPrice,
            merchant_id: item.merchant_id
          };

          // 提交订单详情
          return axios.post('http://localhost:8081/api/orders/insert_one', orderDetails);
        });

        // 等待所有订单详情提交成功
        Promise.all(orderDetailsPromises).then(() => {
          // 第三步：跳转到支付页面
          this.$router.push({ name: 'user_payment', query: { order_id: orderId, total_amount: totalAmount } });
        }).catch(error => {
          console.error('订单详情提交失败', error);
        });
      }).catch(error => {
        console.error('创建订单失败', error);
      });
    }
  },
  created() {
    this.fetchCartDetails();
  }
};
</script>
