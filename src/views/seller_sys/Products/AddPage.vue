<template>
  <div>
    <input type="text" v-model="product.name" placeholder="Product Name" />
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
        img_url: '' // 存储上传后图片的URL
      },
      selectedFile: null, // 存储用户选择的文件
      previewImage: null, // 存储预览图片的URL
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
      // 上传商品信息
      axios.post('http://localhost:8081/api/products/add', this.product)
          .then(response => {
            console.log('商品信息上传成功', response);
            // 这里可以添加成功后的处理逻辑
          })
          .catch(error => {
            console.error('商品信息上传失败', error);
            // 这里可以添加错误处理逻辑
          });
    }
  }
}
</script>

<style>
.preview-image {
  max-width: 100%; /* 或者设置一个具体的宽度 */
  height: auto; /* 保持图片比例 */
  margin-top: 20px; /* 图片与输入框之间的间隔 */
}
</style>
