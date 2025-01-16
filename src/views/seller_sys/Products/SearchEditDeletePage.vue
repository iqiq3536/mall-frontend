<template>
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
          <div v-if="!product.isEditing">
            <button @click="editProduct(index)" class="action-button">编辑</button>
            <button @click="deleteProduct(product.id)" class="action-button">删除</button>
          </div>
          <div v-else>
            <button @click="saveProduct(index)" class="action-button">保存</button>
            <button @click="cancelEdit(index)" class="action-button">取消</button>
          </div>
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
      products: [],
      product_exam: [],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:8081/api/products/list', {withCredentials: true}).then(response => {
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
    editProduct(index) {
      this.products[index].isEditing = true;
    },
    saveProduct(index) {
      const product = this.products[index];
      axios.put(`http://localhost:8081/api/products/edit/${product.id}`, {
        img_url: product.img_url,
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        category: product.category,
      }, {withCredentials: true}).then(() => {
        console.log(product.name)
        product.isEditing = false;
      });
    },
    cancelEdit(index) {
      this.products[index].isEditing = false;
    },
    deleteProduct(productId) {
      axios.delete(`http://localhost:8081/api/products/delete/${productId}`, {withCredentials: true}).then(() => {
        this.products = this.products.filter(product => product.id !== productId);
      });
    },
  },
};
</script>

<style>
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
  width: 40px; /* 设置图片宽度为40像素 */
  height: 40px; /* 设置图片高度为40像素 */
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
  margin-right: 10px;
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