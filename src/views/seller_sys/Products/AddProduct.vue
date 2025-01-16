<template>
  <div>
    <input type="text" v-model="product.name" placeholder="Product Name" />
    <input type="text" v-model="product.description" placeholder="Product Description" />
    <select v-model="product.category">
      <option disabled value="">Please select one</option>
      <option value="flower">Flower</option>
      <option value="bird">Bird</option>
      <option value="fish">Fish</option>
      <option value="pet">Pet</option>
      <option value="insect">Insect</option>
    </select>
    <input type="text" v-model="product.price" placeholder="Product price" />
    <input type="text" v-model="product.stock" placeholder="Product stock" />
    <input type="file" @change="handleFileChange" />
    <button @click="uploadImage">上传图片</button>
    <button @click="confirmUpload" :disabled="!product.img_url">确认上传商品信息</button>
    <div v-if="previewImage">
      <img :src="previewImage" alt="预览图片" class="preview-image" />
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
    };
  },
  methods: {
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
.preview-image {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
}
</style>
