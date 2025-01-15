<template>
  <div class="search-container">
    <div class="search-bar">
      <input
          type="text"
          v-model="searchQuery"
          class="search-input"
          placeholder="请输入搜索内容"
      />
      <button class="search-btn" @click="handleSearch">搜索</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return {
      searchQuery: "", // 搜索关键字
    };
  },
  methods: {
    handleSearch() {
      if (!this.searchQuery.trim()) {
        alert("请输入搜索内容！");
        return;
      }

      // 跳转到搜索结果页面并传递搜索关键字
      this.$router.push({
        name: "SearchResult", // 结果页面的路由名称
        query: { query: this.searchQuery }, // 使用 query 参数传递搜索关键字
      });
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 500px;
  background-color: #f7f7f7;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.search-btn {
  background-color: #ff4d4f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.search-btn:hover {
  background-color: #e43b3d;
}
</style>

