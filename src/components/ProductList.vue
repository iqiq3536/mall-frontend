<template>
  <div>
    <!-- 商品列表 -->
    <el-row :gutter="20">
      <el-col :span="6" v-for="item in items" :key="item.id">
        <el-card shadow="hover" @click.native="goToProductDetail(item.id)">
          <el-image
              :src="item.img_url"
              alt="商品图片"
              style="width: 100%; height: 200px; object-fit: cover"
          />
          <div style="margin-top: 10px; text-align: center;">
            <p>{{ item.name }}</p>
            <p style="color: red; font-weight: bold;">¥{{ item.price }}</p>
            <el-button type="primary" size="small">购买</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 加载提示 -->
    <div v-if="loading" style="text-align: center; margin-top: 20px;">
      <el-spinner />
      <p>加载中...</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [], // 商品列表数据
      loading: false, // 加载状态
      hasMore: true, // 是否还有更多数据
      currentPage: 1, // 当前页码
      pageSize: 8, // 每页商品数量
    };
  },
  mounted() {
    this.loadMore(); // 加载初始数据
    window.addEventListener("scroll", this.handleScroll); // 监听滚动事件
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 移除滚动事件监听
  },
  methods: {
    goToProductDetail(id) {

      this.$router.push({ name: "ProductDetail", params: { id } });
    },
    async loadMore() {
      if (this.loading || !this.hasMore) return;

      this.loading = true;

      try {
        const response = await axios.get("http://localhost:8081/api/ProductRecomment/List", {withCredentials: true});

        // 提取需要的字段
        const newItems = response.data.map(item => ({
          id:item.id,
          name: item.name,
          price: item.price,
          img_url: 'http://localhost:8081/api/product_images/file/'+item.img_url,
        }));

        this.items.push(...newItems);
        this.currentPage += 1;

        // 判断是否还有更多数据
        if (newItems.length < this.pageSize) {
          this.hasMore = false;
        }
      } catch (error) {
        console.error("加载数据失败：", error);
      } finally {
        this.loading = false;
      }
    },
    handleScroll() {
      const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      // 判断是否滚动到底部
      if (scrollTop + windowHeight >= scrollHeight - 10) {
        this.loadMore();
      }
    },
  },
};
</script>

<style>
/* 样式优化 */
.el-card {
  height: 350px;
}
</style>



