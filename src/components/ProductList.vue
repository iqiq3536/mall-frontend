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

    <!-- 订单列表 -->
    <div v-if="orders.length > 0" style="margin-top: 50px;">
      <h2>您的订单</h2>
      <el-table :data="orders" style="width: 100%">
        <el-table-column prop="id" label="订单 ID" width="180"></el-table-column>
        <el-table-column prop="item" label="商品" width="180"></el-table-column>
        <el-table-column prop="quantity" label="数量" width="180"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [], // 商品列表
      loading: false, // 加载状态
      hasMore: true, // 是否还有更多数据
      currentPage: 1, // 当前页码
      pageSize: 8, // 每页商品数量
      orders: [], // 订单列表
    };
  },
  mounted() {
    this.loadMore(); // 加载初始商品数据
    this.loadOrders(); // 加载订单数据
    window.addEventListener("scroll", this.handleScroll); // 监听滚动事件
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll); // 移除滚动事件监听
  },
  methods: {
    // 点击商品跳转到商品详情页面
    goToProductDetail(id) {
      // 发送 POST 请求记录用户访问，自动携带 cookie 信息
      axios
          .post(
              "http://localhost:8081/api/user/user_browsomg_history",
              { product_id: id },
              { withCredentials: true } // 发送请求时携带 cookie
          )
          .then(() => {
            this.$router.push({ name: "ProductDetail", params: { id } });
          })
          .catch((error) => {
            console.error("记录访问失败：", error);
            this.$router.push({ name: "ProductDetail", params: { id } });
          });
    },

    // 加载商品数据
    async loadMore() {
      if (this.loading || !this.hasMore) return;

      this.loading = true;

      try {
        const response = await axios.get("http://localhost:8081/api/test");

        // 提取需要的字段
        const newItems = response.data.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          img_url: "http://localhost:8081/api/product_images/file/" + item.img_url,
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

    // 处理滚动事件加载更多数据
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

<style scoped>
/* 样式优化 */
.el-card {
  height: 350px;
}
</style>




