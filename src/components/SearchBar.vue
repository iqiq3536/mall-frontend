<template>
  <div class="search-container">
    <div class="search-bar">
      <input
          type="text"
          v-model="searchQuery"
          class="search-input"
          placeholder="请输入搜索内容"
          @input="handleInput"
      />
      <button class="upload-btn" @click="triggerFileInput">
        <img src="@/assets/upload-icon.png" alt="Upload" />
      </button>
      <input
          ref="fileInput"
          type="file"
          accept="image/*"
          class="file-input"
          @change="handleFileUpload"
      />
      <button class="search-btn" @click="handleSearch">搜索</button>
    </div>
    <div v-if="imagePreview" class="image-preview">
      <img :src="imagePreview" alt="Preview" />
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "",
      imagePreview: null,
    };
  },
  methods: {
    handleInput() {
      // 可以根据需要处理输入内容
    },
    handleSearch() {
      // 搜索的逻辑
      alert(`搜索: ${this.searchQuery}`);
    },
    triggerFileInput() {
      this.$refs.fileInput.click(); // 触发隐藏的文件上传按钮
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result; // 显示预览图像
        };
        reader.readAsDataURL(file); // 将文件读取为DataURL
      }
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #d9534f; /* 红色背景 */
  padding: 10px 20px;
  border-radius: 5px;
  width: 500px;
  max-width: 100%;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

.search-input:focus {
  outline: none;
}

.upload-btn {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.upload-btn img {
  width: 20px;
  height: 20px;
}

.search-btn {
  background-color: #f0ad4e; /* 搜索按钮颜色 */
  border: none;
  color: white;
  font-size: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #ec971f;
}

.file-input {
  display: none;
}

.image-preview {
  margin-top: 20px;
}

.image-preview img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
}
</style>
