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
          <td>{{ item.productName }}</td>
          <td>
            <img :src="item.image" alt="商品图片" class="product-image" />
          </td>
          <td>
            <button @click="decreaseQuantity(index)">-</button>
            <span>{{ item.quantity }}</span>
            <button @click="increaseQuantity(index)">+</button>
          </td>
          <td>{{ item.price }}</td>
          <td>{{ calculateSubtotal(item) }}</td>
          <td>
            <button @click="deleteProduct(index)" class="delete-button">
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
        <button @click="clearProducts" class="pay-button">
          清空
        </button>
      </div>
    </div>
  </div>
</template>

<script>

import NavigationBar from "@/components/NavigationBar.vue"; // 假设您的导航栏组件路径

export default {
  name: "ProductPage",
  components: {NavigationBar},
  data() {
    return {
      products: [], // 商品列表
    };
  },
  methods: {
    // 从接口获取商品数据
    fetchProducts() {
      // 模拟获取数据
      this.products = [
        {
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
      ];
    },
    // 增加数量
    increaseQuantity(index) {
      this.products[index].quantity++;
    },
    // 减少数量
    decreaseQuantity(index) {
      if (this.products[index].quantity > 1) {
        this.products[index].quantity--;
      }
    },
    // 删除商品
    deleteProduct(index) {
      this.products.splice(index, 1);
    },
    // 计算单个商品的小计
    calculateSubtotal(item) {
      return item.quantity * item.price;
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
      if (selectedProducts.length === 0) {
        alert("请选择至少一个商品进行支付！");
        return;
      }
      alert("跳转支付页面！");
      // 您可以在此处实现支付逻辑
    },
  },
  mounted() {
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