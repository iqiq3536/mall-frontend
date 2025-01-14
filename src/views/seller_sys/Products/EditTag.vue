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
      <div>
        <div v-for="(tag) in product.tags" :key="tag.id">
          <span>{{ tag.name }}</span>
          <button @click="removeTag(product.id, tag.id, index)">Remove</button>
        </div>
        <input type="text" v-model="product.newTagName" placeholder="New tag name" />
        <button @click="addTag(product.id, index)">Add Tag</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      newTag: { name: '' },
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
          newTagName: '', // Add a new property for each product to hold the new tag name
          tags: [],
        }));
        this.fetchTagsForProducts();
      });
    },
    fetchTagsForProducts() {
      console.log("1222")
      this.products.forEach(product => {
        axios.get(`http://localhost:8081/api/products/tags/${product.id}`, {withCredentials: true}).then(response => {
          product.tags = response.data;
        });
      });
    },
    removeTag(productId, tagId, index) {
      axios.delete(`http://localhost:8081/api/products/tags/delete/${productId}/${tagId}`, {withCredentials: true}).then(() => {
        this.products[index].tags = this.products[index].tags.filter(tag => tag.id !== tagId);
      });
    },
    addTag(productId, index) {
      axios.post(`http://localhost:8081/api/products/tags/add/${productId}`,{ name: this.products[index].newTagName }, {withCredentials: true}).then(response => {
        if(response.data){
          this.products[index].tags.push(response.data);
          this.products[index].newTagName = ''; // Clear the new tag name after adding
        }
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
