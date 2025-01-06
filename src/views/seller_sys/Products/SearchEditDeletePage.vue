<template>
  <div>
    <h1>商品列表</h1>
    <div v-for="(product, index) in products" :key="product.id" class="product-item">
      <img :src="'http://localhost:8081/api/images/' + product.img_url" alt="图片描述">
      <h3>
        <span v-if="!product.isEditing">{{ product.name }}</span>
        <input v-else type="text" v-model="product.name" />
      </h3>
      <div v-if="!product.isEditing">
        <button @click="editProduct(index)">编辑</button>
        <button @click="deleteProduct(product.id)">删除</button>
      </div>
      <div v-else>
        <button @click="saveProduct(index)">保存</button>
        <button @click="cancelEdit(index)">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [

      ],
    };
  },
  created() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios.get('http://localhost:8081/api/products/list').then(response => {
        this.products = response.data.map(product => ({
          ...product,
          isEditing: false,
        }));
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
      }).then(() => {
        console.log(product.name)
        product.isEditing = false;
      });
    },
    cancelEdit(index) {
      this.products[index].isEditing = false;
    },
    deleteProduct(productId) {
      axios.delete(`http://localhost:8081/api/products/delete/${productId}`).then(() => {
        this.products = this.products.filter(product => product.id !== productId);
      });
    },
  },
};
</script>

<style>
.product-item {
  margin-bottom: 20px;
}
.product-item img {
  width: 100px;
  height: 100px;
}
</style>
