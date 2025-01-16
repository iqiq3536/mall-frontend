<template>
  <div>
    <div class="top-bar">
      <a href="http://localhost:8082/ProductAdd">添加产品</a>
      <a href="http://localhost:8082/ProductList">产品列表</a>
      <a href="http://localhost:8082/ProductTagList">产品标签列表</a>
      <span class="merchant-name">{{this.merchantName}}</span>
    </div>
  <div class="product-form-container">
    <h2>添加商品</h2>
    <div class="form-group">
      <label for="productName">商品名称</label>
      <input type="text" v-model="product.name" placeholder="Product Name" id="productName" class="form-input">
    </div>
    <div class="form-group">
      <label for="productDescription">商品描述</label>
      <input type="text" v-model="product.description" placeholder="Product Description" id="productDescription" class="form-input">
    </div>
    <div class="form-group">
      <label for="productCategory">商品分类</label>
      <select v-model="product.category" id="productCategory" class="form-input">
        <option disabled value="">请选择一个分类</option>
        <option value="flower">Flower</option>
        <option value="bird">Bird</option>
        <option value="fish">Fish</option>
        <option value="pet">Pet</option>
        <option value="insect">Insect</option>
      </select>
    </div>
    <div class="form-group">
      <label for="productPrice">商品价格</label>
      <input type="text" v-model="product.price" placeholder="Product Price" id="productPrice" class="form-input">
    </div>
    <div class="form-group">
      <label for="productStock">商品库存</label>
      <input type="text" v-model="product.stock" placeholder="Product Stock" id="productStock" class="form-input">
    </div>
    <div class="form-group">
      <label for="productImage">商品图片</label>
      <input type="file" @change="handleFileChange" id="productImage" class="form-input">
    </div>
    <div class="form-group">
      <button @click="uploadImage" class="form-button">上传图片</button>
      <button @click="confirmUpload" :disabled="!product.img_url" class="form-button">确认上传商品信息</button>
    </div>
    <div v-if="previewImage" class="preview-image-container">
      <img :src="previewImage" alt="预览图片" class="preview-image">
    </div>
  </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        name: '',
        img_url: '' ,
        description: '',
        category:'',
        price:'',
        stock:'',
      },
      selectedFile: null,
      previewImage: null,
      merchantName: '',
    };
  },

  created() {
    this.fetchMerchantName();
  },
  methods: {
    clk() {
      console.log(this.merchantName);
    },
    fetchMerchantName() {
      axios.get('http://localhost:8081/api/merchants_name', {withCredentials: true}).then(response => {
        this.merchantName = response.data;
        console.log(this.merchantName);
      });
    },

    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.previewImage = URL.createObjectURL(file);
      }
    },
    uploadImage() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
        axios.post('http://localhost:8081/api/goods_img/upload', formData, {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log('图片上传成功，访问URL:', response.data);
          this.product.img_url = response.data;
          console.log(this.product.img_url)
        }).catch(error => {
          console.error('图片上传失败:', error);
        });
      }
    },
    confirmUpload() {
      axios.post('http://localhost:8081/api/products/add', this.product, {withCredentials: true})
          .then(response => {
            console.log('商品信息上传成功', response);
          })
          .catch(error => {
            console.error('商品信息上传失败', error);
          });
    }
  }
}
</script>

<style>
.product-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.product-form h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-button {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  font-size: 16px;
}

.form-button:hover {
  background-color: #0056b3;
}

.form-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.preview-image-container {
  text-align: center;
  margin-top: 20px;
}

.preview-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
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