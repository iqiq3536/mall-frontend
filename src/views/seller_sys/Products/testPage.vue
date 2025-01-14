<template>
  <div>
    <h1>商品列表</h1>
    <div v-for="(product, index) in products" :key="product.id" class="product-item">
      <img :src="'http://localhost:8081/api/images/' + product.img_url" alt="图片描述">
      <h3>
        <span v-if="!product.isEditing">{{ product.name }}</span>
        <input v-else type="text" v-model="product.name" />
      </h3>
      <p>
        <span v-if="!product.isEditing">{{ product.price }}</span>
        <input v-else type="text" v-model="product.price" />
      </p>
      <p>
        <span v-if="!product.isEditing">{{ product.stock }}</span>
        <input v-else type="text" v-model="product.stock" />
      </p>
      <p>
        <span v-if="!product.isEditing">{{ product.description }}</span>
        <input v-else type="text" v-model="product.description" />
      </p>
      <p>
        <span v-if="!product.isEditing">{{ product.category }}</span>
        <select v-else v-model="product.category">
          <option value="flower">Flower</option>
          <option value="bird">Bird</option>
          <option value="fish">Fish</option>
          <option value="pet">Pet</option>
          <option value="insect">Insect</option>
        </select>
      </p>
      <p>
        <span>value = {{product.id}}</span>
        <span>   </span><span> + value = {{ product_exam[index] }}</span>
        <span v-if="product_exam[index] !== undefined">状态：{{ product_exam[index] === 0 ? '下架' : '上架' }}</span>
      </p>
      <button v-if="product_exam[index] === 0" @click="upProduct(product.id, index)">上架</button>
      <button v-if="product_exam[index] === 1" @click="downProduct(product.id, index)">下架</button>
    </div>
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
        console.log(this.products.length)
        this.fetchProductExamStatus();
      });
    },
    fetchProductExamStatus() {
      console.log("11")
      console.log(this.products.length)
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
.product-item {
  margin-bottom: 20px;
}
.product-item img {
  width: 100px;
  height: 100px;
}
</style>
