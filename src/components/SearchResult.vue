<template>
  <div class="search-results-container">
    <!-- 搜索提示 -->
    <div v-if="!searchKeyword" class="no-keyword">
      <p>请输入搜索关键字！</p>
    </div>

    <!-- 搜索结果 -->
    <div v-else>
      <h2>搜索结果：{{ searchKeyword }}</h2>
      <div v-if="loading" class="loading">
        <p>正在加载，请稍候...</p>
      </div>
      <div v-else-if="searchResults.length === 0" class="no-results">
        <p>没有找到匹配的结果。</p>
      </div>
      <div v-else class="results-list">
        <div v-for="item in searchResults" :key="item.id" class="result-item">
          <img :src="item.img_url" alt="商品图片" class="result-image" />
          <div class="result-info">
            <p class="result-name">{{ item.name }}</p>
            <p class="result-price">价格：¥{{ item.price }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SearchResults",
  data() {
    return {
      searchKeyword: "", // 搜索关键字
      searchResults: [], // 搜索结果
      loading: false, // 加载状态
    };
  },
  watch: {
    // 监听路由变化
    "$route.query.query": "fetchSearchResults",
  },
  mounted() {
    this.fetchSearchResults(); // 页面加载时执行搜索
  },
  methods: {
    async fetchSearchResults() {
      this.searchKeyword = this.$route.query.query || ""; // 获取搜索关键字

      if (!this.searchKeyword.trim()) {
        this.searchResults = [];
        return;
      }

      this.loading = true;

      try {
        // 调用后端搜索接口
        const response = await axios.get("http://localhost:8081/api/search", {
          params: { keyword: this.searchKeyword },
        });
        this.searchResults = response.data; // 更新搜索结果
      } catch (error) {
        console.error("搜索失败：", error);
        alert("搜索失败，请稍后再试！");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.search-results-container {
  padding: 20px;
}

.no-keyword,
.no-results,
.loading {
  text-align: center;
  color: #666;
}

.results-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.result-item {
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.result-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  margin-bottom: 10px;
}

.result-info {
  font-size: 14px;
}

.result-name {
  font-weight: bold;
  margin-bottom: 5px;
}

.result-price {
  color: red;
  font-size: 16px;
}
</style>

