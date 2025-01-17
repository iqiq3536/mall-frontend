<template>
  <div>
    <!-- 顶部导航栏 -->
    <NavigationBar></NavigationBar>

    <!-- 表格 -->
    <div class="container">
      <table class="product-table">
        <thead>
        <tr>
          <th>选择</th>
          <th>用户名</th>
          <th>商品名称</th>
          <th>商品图片</th>
          <th>数量</th>
          <th>单价</th>
          <th>总价</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in products" :key="index">
          <td>
            <input type="checkbox" v-model="item.selected" />
          </td>
          <td>{{ item.username }}</td>
          <td>{{ item.product_name }}</td>
          <td>
            <img :src="'http://localhost:8081/api/product_images/file/' + item.img_url" alt="商品图片" class="product-image" />
          </td>
          <td>
            <button @click="decreaseQuantity(index,item.cart_details_id)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(index,item.cart_details_id)">+</button>
          </td>
          <td>{{ item.unit_price }}</td>
          <td>{{ calculateSubtotal(item) }}</td>
          <td>
            <button @click="deleteProduct(index,item.cart_details_id)" class="delete-button">
              删除
            </button>
          </td>
        </tr>
        </tbody>
      </table>

      <!-- 总价和支付按钮 -->
      <div class="summary">
        <span>已选择商品总价：{{ calculateTotalPrice() }}</span>
        <button @click="goToPayment" class="pay-button">
          支付
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import NavigationBar from "@/components/NavigationBar.vue";
import axios from "axios"; // 假设您的导航栏组件路径

export default {
  name: "ProductPage",
  components: {NavigationBar},
  data() {
    return {
      products: [], // 商品列表
      cart_details:{
        cart_details_id:"",
        cart_id:"",
        product_id:"",
        quantity:"",
        unit_price:"",
        merchant_id:"",
        product_name:"",
        img_url:"",
        username:"",
        user_id:"",
      }
    };
  },
  methods: {
    creatCart(){
      axios.get('http://localhost:8081/api/cart/InsertShopping_carts',{withCredentials: true})
    },
    // 从接口获取商品数据
    fetchProducts() {
      axios.get(`http://localhost:8081/api/cart/getCart3`,{withCredentials: true})
          .then(response => {
            console.log("Fetched Orders List:", response.data.findByUser_id2);
            this.products = response.data.map(cart_details=>({...cart_details}))
          })
          .catch(error => {
            console.error("Error fetching orders list:", error);
          });
      // 模拟获取数据
      /*this.products = [
        {
          cart_details_id:"1",
          username: "用户1",
          productName: "商品A",
          image: "https://via.placeholder.com/50",
          quantity: 1,
          price: 50,
          selected: false,
        },
        {
          username: "用户2",
          productName: "商品B",
          image: "https://via.placeholder.com/50",
          quantity: 2,
          price: 100,
          selected: false,
        },
      ];*/
    },
    // 增加数量
    increaseQuantity(index,cart_details_id) {
      this.products[index].quantity++;
      axios.put(`http://localhost:8081/api/cart_details/edit`,
          {cart_details_id:cart_details_id, quantity:this.products[index].quantity})
    },
    // 减少数量
    decreaseQuantity(index,cart_details_id) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
        axios.put('http://localhost:8081/api/cart_details/edit', {cart_details_id:cart_details_id, quantity:this.products[index].quantity})
      }
    },
    // 删除商品
    deleteProduct(index,cart_details_id) {
      this.products.splice(index, 1);
      axios.put('http://localhost:8081/api/cart_details/deleteOne', {cart_details_id: cart_details_id})
      this.fetchProducts();
    },
    // 计算单个商品的小计
    calculateSubtotal(item) {
      return item.quantity * item.unit_price;
    },
    // 计算已选择商品的总价
    calculateTotalPrice() {
      return this.products
          .filter((item) => item.selected)
          .reduce((total, item) => total + this.calculateSubtotal(item), 0);
    },
    // 跳转支付
    goToPayment() {
      const selectedProducts = this.products.filter((item) => item.selected);
      const totalAmount = this.calculateTotalPrice();
      if (selectedProducts.length === 0) {
        alert("请选择至少一个商品进行支付！");
        return;
      }
      // 您可以在此处实现支付逻辑
      axios.post('http://localhost:8081/api/orders/insertOrders',
          {total_amount: totalAmount},
          {withCredentials: true,
          }).then(response => {
        const orderId = response.data;
        console.log(orderId);
        // 第二步：提交订单详情
        const orderDetailsPromises = selectedProducts.map(cart_details => {
          const totalPrice = cart_details.unit_price * cart_details.quantity;

          //从购物车中删除所选商品
          this.deleteProduct(1,cart_details.cart_details_id);
          // 提交订单详情
          return axios.post('http://localhost:8081/api/order_details/insert_one',
              {
                order_id: orderId,
                product_id: cart_details.product_id,
                quantity: cart_details.quantity,
                unit_price: cart_details.unit_price,
                total_price: totalPrice,
                merchant_id: cart_details.merchant_id
              },{withCredentials: true});
        });

        // 等待所有订单详情提交成功
        Promise.all(orderDetailsPromises).then(() => {
          // 第三步：跳转到支付页面
          this.$router.push({ name: 'userPayment', query: { order_id: orderId, total_amount: totalAmount } });
        }).catch(error => {
          console.error('订单详情提交失败', error);
        });
      }).catch(error => {
        console.error('创建订单失败', error);
      });
    },
  },
  mounted() {
    this.creatCart();
    this.fetchProducts();
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.product-table th,
.product-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.product-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  font-size: 16px;
}

.pay-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.pay-button:hover {
  background-color: #45a049;
}

.delete-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 5px;
}

.delete-button:hover {
  background-color: #d32f2f;
}
</style>