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
          v-for="cart_details in cartDetails"
          :key="cart_details.cart_details_id"
          :selected="cart_details.selected"
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
      cart_details:{
        cart_details_id:"",
        cart_id:"",
        product_id:"",
        quantity:"",
        unit_price:"",
        create_data:"",
        merchant_id:"",
        selected:""
      },
      allSelected: false
    };
  },
  computed: {
    selectedCount() {
      return this.cartDetails.filter(cart_details => cart_details.selected).length;
    },
    totalAmount() {
      return this.cartDetails.reduce((total, cart_details) => {
        return cart_details.selected ? total + (cart_details.unit_price * cart_details.quantity) : total;
      }, 0);
    }
  },
  methods: {
    creatCart(){
      axios.post('http://localhost:8081/api/InsertShopping_carts',{withCredentials: true})
    },
    fetchCartDetails() {
      axios.get('http://localhost:8081/api/SelectShopping_carts', {withCredentials: true})
          .then(response => {
            const cart_id = response.data;
            return axios.get('http://localhost:8081/api/get_cart_details_list', {params: {cart_id:cart_id}});
          })
          .then(response => {
            this.cartDetails = response.data.map(cart_details => {
              return {...cart_details, selected: false};
            });
          });
    },
    updateQuantity(cart_details, quantity) {
      axios.put('http://localhost:8081/api/edit', {cart_details_id:cart_details.cart_details_id, quantity:quantity})
          .then(() => {
            cart_details.quantity = quantity;
          });
    },
    deleteItem(cart_details) {
      axios.delete('http://localhost:8081/api/deleteOne', {cart_details_id: cart_details.cart_details_id})
          .then(() => {
            this.cartDetails = this.cartDetails.filter(i => i.cart_details_id !== cart_details.cart_details_id);
          });
    },
    selectItem(cart_details) {
      cart_details.selected = !cart_details.selected;
    },
    toggleAllSelection() {
      this.cartDetails.forEach(cart_details => {
        cart_details.selected = this.allSelected;
      });
    },
    clearAll() {
      axios.get('http://localhost:8081/api/SelectShopping_carts', {withCredentials: true})
          .then(response => {
            const cart_id = response.data;
            axios.delete('http://localhost:8081/api/deleteAll', {params: {cart_id:cart_id}})
                .then(() => {
                  this.cartDetails = [];
                });
          });
    },
    order() {
      // 获取已选中的商品
      const selectedItems = this.cartDetails.filter(cart_details => cart_details.selected);
      // 计算总金额
      const totalAmount = this.totalAmount;
      // 获取用户ID (假设 user_id 已通过某种方式获得)
      //const userId = 123; // 替换为实际的 user_id
      // 第一步：创建订单
      axios.post('http://localhost:8081/api/orders/insertOrders', {
        withCredentials: true,
        total_amount: totalAmount
      }).then(response => {
        const orderId = response.data.order_id;
        // 第二步：提交订单详情
        const orderDetailsPromises = selectedItems.map(cart_details => {
          const totalPrice = cart_details.unit_price * cart_details.quantity;

          // 构建订单详情对象
          const orderDetails = {
            order_id: orderId,
            product_id: cart_details.product_id,
            quantity: cart_details.quantity,
            unit_price: cart_details.unit_price,
            total_price: totalPrice,
            merchant_id: cart_details.merchant_id
          };
          //从购物车中删除所选商品
          this.deleteItem(cart_details);
          // 提交订单详情
          return axios.post('http://localhost:8081/api/orders/insert_one', orderDetails,{withCredentials: true});
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
    this.creatCart();
    this.fetchCartDetails();
  }
};
</script>
