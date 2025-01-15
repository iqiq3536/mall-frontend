<template>
  <div>
    <p>这是 ID 为 {{ productId }} 的商品详情面板：</p>
    <div v-if="loading" class="loading-container">
      <el-spinner size="large"></el-spinner>
    </div>
    <div v-else-if="images.length === 0" class="no-images">
      <p>暂无图片。</p>
    </div>
    <div v-else class="image-gallery">
      <img
          v-for="(image, index) in images"
          :key="index"
          :src="image.url"
      alt="商品图片"
      class="product-image"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    productId: {
      type: [String, Number], // 支持字符串和数字
      required: true,
    },
  },
  data() {
    return {
      images: [], // 存储图片对象列表
      loading: true, // 加载状态
    };
  },
  methods: {
    fetchImages() {
      const apiUrl = `/api/product_images/${this.productId}`; // 使用 API 端点
      axios
          .get(apiUrl)
          .then((response) => {
            if (Array.isArray(response.data)) {
              // 将 API 返回的图片列表设置到 images
              this.images = response.data;
            } else {
              console.warn("API 返回数据格式异常");
              this.images = [];
            }
          })
          .catch((error) => {
            console.error("获取图片失败：", error);
            this.images = [];
          })
          .finally(() => {
            this.loading = false; // 加载结束
          });
    },
  },
  mounted() {
    this.fetchImages();
  },
};
</script>

<style scoped>
.image-gallery {
  display: flex;
  flex-direction: column; /* 使图片竖向排列 */
  align-items: center; /* 图片居中对齐 */
  gap: 0; /* 去掉图片之间的间隙 */
  padding: 0; /* 去掉内边距 */
  background-color: #fff; /* 去掉背景色 */
  border: none; /* 去掉边框 */
}

.product-image {
  width: 100%; /* 图片宽度占满父容器 */
  height: auto; /* 自动调整高度，保持图片比例 */
  margin: 0; /* 去掉外边距 */
  border: none; /* 去掉图片边框 */
  object-fit: cover; /* 保持图片内容完整 */
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.no-images {
  text-align: center;
  color: #999;
  font-size: 16px;
  padding: 20px;
}
</style>









