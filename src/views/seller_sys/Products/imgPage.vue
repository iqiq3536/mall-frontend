<template>
  <div>
    <input type="file" @change="handleFileChange" />
    <button @click="confirmUpload">确定上传</button>
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
    confirmUpload() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);

        axios.post('http://localhost:8081/api/goods_img/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          console.log('图片上传成功，访问URL:', response.data);
          console.log(response.data)
        }).catch(error => {
          console.error('图片上传失败:', error);
        });
      }
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
