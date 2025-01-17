<template>
  <div>
  <nav class="navbar">
    <div class="navbar-left">
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/adminControl" class="navbar-link">用户管理</router-link>
        </li>
        <li class="navbar-item">
          <router-link to="/sellerControl" class="navbar-link">商家管理</router-link>
        </li>
      </ul>
    </div>
    <div class="navbar-right">
      <ul class="navbar-list">
        <li class="navbar-item">
          <router-link to="/ProductExam" class="navbar-link">商品管理</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <main class="content">
  <div class="product-list-container">
    <h1>商品列表</h1>
    <table class="product-table">
      <thead>
      <tr>
        <th>商品图片</th>
        <th>商品名称</th>
        <th>价格</th>
        <th>库存</th>
        <th>描述</th>
        <th>分类</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(product, index) in products" :key="product.id">
        <td>
          <img :src="'http://localhost:8081/api/images/' + product.img_url" alt="商品图片" class="product-image">
        </td>
        <td>
          <span v-if="!product.isEditing">{{ product.name }}</span>
          <input v-else type="text" v-model="product.name" class="edit-input" />
        </td>
        <td>
          <span v-if="!product.isEditing">{{ product.price }}</span>
          <input v-else type="text" v-model="product.price" class="edit-input" />
        </td>
        <td>
          <span v-if="!product.isEditing">{{ product.stock }}</span>
          <input v-else type="text" v-model="product.stock" class="edit-input" />
        </td>
        <td>
          <span v-if="!product.isEditing">{{ product.description }}</span>
          <input v-else type="text" v-model="product.description" class="edit-input" />
        </td>
        <td>
          <span v-if="!product.isEditing">{{ product.category }}</span>
          <select v-else v-model="product.category" class="edit-input">
            <option value="flower">Flower</option>
            <option value="bird">Bird</option>
            <option value="fish">Fish</option>
            <option value="pet">Pet</option>
            <option value="insect">Insect</option>
          </select>
        </td>
        <td>
          <span v-if="product_exam[index] !== undefined">{{ product_exam[index] === 0 ? '下架' : '上架' }}</span>
        </td>
        <td>
          <button v-if="product_exam[index] === 0" @click="upProduct(product.id, index)" class="action-button">上架</button>
          <button v-if="product_exam[index] === 1" @click="downProduct(product.id, index)" class="action-button">下架</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
  </main>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      product_exam: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:8081/api/products/list_admin', {withCredentials: true}).then(response => {
        this.products = response.data.map(product => ({
          ...product,
          isEditing: false,
        }));
        this.fetchProductExamStatus();
      });
    },
    fetchProductExamStatus() {
      this.products.forEach((product, index) => {
        axios.get(`http://localhost:8081/api/exam_product/test?id=${product.id}`, {withCredentials: true})
            .then(response => {
              this.$set(this.product_exam, index, response.data);
            })
            .catch(error => {
              console.error("Error fetching product exam status:", error);
            });
      });
    },
    upProduct(productId, index) {
      console.log(productId)
      axios.post(`http://localhost:8081/api/exam_product/up`, { id: productId }, {withCredentials: true}).then(() => {
        this.$set(this.product_exam, index, 1);
      });
    },
    downProduct(productId, index) {
      axios.post(`http://localhost:8081/api/exam_product/down`, { id: productId }, {withCredentials: true}).then(() => {
        this.$set(this.product_exam, index, 0);
      });
    },
  },
};
</script>

<style>
.navbar {
  background-color: #f7f7f7;  /* 添加淡灰色背景 */
  width: 100%;  /* 使导航栏占满整个屏幕 */
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.navbar-left,
.navbar-right {
  display: flex;
}

.navbar-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.navbar-item {
  margin: 0 20px;
  position: relative; /* 为下拉菜单做定位 */
}

.navbar-link {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s;
}

.navbar-link:hover {
  color: #f90;
}

.navbar-right .navbar-item {
  margin-left: 30px;
}
.product-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
}

.product-table th, .product-table td {
  border: 1px solid #ccc;
  padding: 10px;
  text-align: center;
}

.product-table th {
  background-color: #f2f2f2;
}

.product-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.edit-input {
  width: 90%;
  padding: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.action-button {
  padding: 8px 15px;
  margin-left: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.action-button:hover {
  background-color: #0056b3;
}
</style>