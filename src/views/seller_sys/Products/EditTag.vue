<template>

  <div>
    <div class="top-bar">
      <a href="http://localhost:8082/ProductAdd">添加产品</a>
      <a href="http://localhost:8082/ProductList">产品列表</a>
      <a href="http://localhost:8082/ProductTagList">产品标签列表</a>
      <a href="http://localhost:8082/merchant_order_details_list">订单信息</a>
      <span class="merchant-name">{{this.merchantName}}</span>
    </div>
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
          <span>{{ tag.tag_name }}</span>
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
      newTag: { tag_name: '' },
      merchantName: '',
    };
  },
  created() {
    this.fetchProducts();
    this.fetchMerchantName();
  },
  methods: {
    fetchMerchantName() {
      axios.get('http://localhost:8081/api/merchants_name', {withCredentials: true}).then(response => {
        this.merchantName = response.data;
        console.log(this.merchantName);
      });
    },
    fetchProducts() {
      axios.get('http://localhost:8081/api/products/list', {withCredentials: true}).then(response => {
        this.products = response.data.map(product => ({
          ...product,
          newTagName: '',
          tags: [],
        }));
        this.fetchTagsForProducts();
      });
    },
    fetchTagsForProducts() {
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
      console.log(this.products[index].newTagName);
      axios.post(`http://localhost:8081/api/products/tags/add/${productId}`,{ tag_name: this.products[index].newTagName }, {withCredentials: true}).then(response => {
        if(response.data){
          this.products[index].tags.push(response.data);
          this.products[index].newTagName = '';
        }
      });
    },
  },
};
</script>

<style>
.product-item {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-item img {
  width: 150px; /* 增加图片宽度 */
  height: auto; /* 保持图片比例 */
  border-radius: 4px; /* 圆角图片 */
  margin-bottom: 15px;
}

.product-item h3 {
  margin: 10px 0;
  font-size: 1.5em;
}

.product-item p {
  margin: 5px 0;
}

.product-item input[type="text"],
.product-item select {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box; /* 防止输入框超出容器宽度 */
}

.product-item input[type="text"]:focus,
.product-item select:focus {
  outline: none;
  border-color: #007bff;
}

.product-item div {
  margin-top: 10px;
}

.product-item span {
  display: inline-block;
  margin-right: 10px;
}

.product-item button {
  padding: 8px 15px;
  margin-left: 5px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.product-item button:hover {
  background-color: #0056b3;
}

.product-item button:active {
  background-color: #004494;
}

.top-bar {
  display: flex;
  background-color: #9a9a9a;
  overflow: hidden;
}

.top-bar a {
  float: left;
  display: block;
  color: #000000;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

.top-bar a:hover {
  background-color: #ddd;
  color: black;
}

.merchant-name {
  margin-left: auto; /* 将商户名称推到最右侧 */
  padding: 14px 16px;
  color: white;
  text-decoration: none;
}
</style>

