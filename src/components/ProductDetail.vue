<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>商品详情页</h1>
    <p>商品 ID: {{ productId }}</p>

    <!-- 按钮区域 -->
    <div class="button-container">
      <el-button type="primary" @click="goBack">返回</el-button>
      <el-button @click="addToCart">加入购物车</el-button>
      <el-button>购买</el-button>
    </div>

    <!-- 面板导航区域 -->
    <div class="tabs-container">
      <el-tabs v-model="activeTab" style="margin-top: 20px;">
        <el-tab-pane label="商品详情" name="details">
          <DetailsPanel :productId="productId" />
        </el-tab-pane>
        <el-tab-pane label="商品评价" name="reviews">
          <ReviewsPanel :productId="productId" />
        </el-tab-pane>
        <el-tab-pane label="相关商品" name="related">
          <RelatedPanel :productId="productId" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>


<script>
// 导入面板组件
import DetailsPanel from "@/components/product_details/DetailsPanel.vue";
import ReviewsPanel from "@/components/product_details/ReviewsPanel.vue";
import RelatedPanel from "@/components/product_details/RelatedPanel.vue";
import axios from "axios";

export default {
  components: {
    DetailsPanel,
    ReviewsPanel,
    RelatedPanel,
  },
  data() {
    return {
      productId: null, // 存储商品 ID
      activeTab: "details", // 当前激活的面板
    };
  },
  created() {
    // 从路由参数获取商品 ID
    this.productId = this.$route.params.id;
    this.addhistory();
  },
  methods: {
    addhistory() {
      axios.post("http://localhost:8081/api/ProductRecomment/addhis", {product_id: this.productId},{withCredentials: true})
          .then(response => {
            // 假设返回成功时的反馈
            response;
            this.$message.success("已成功加入历史记录！");
          })
          .catch(error => {
            // 失败时的反馈
            console.error('加入历史记录失败，请稍后再试。', error);
            this.$message.error("加入历史记录失败，请稍后再试。");
          })
    },
    goBack() {
      this.$router.push({ name: "MallHomePage" }); // 跳转回首页
    },
    // 添加商品到购物车
    addToCart() {
      axios.post("http://localhost:8081/api/cart/SelectShopping_carts",{withCredentials: true})
          .then(response=>{
            const cart_id=response.data();
            axios.post("http://localhost:8081/api/cart_details/insert", {product_id: this.productId,cart_id:cart_id})
                .then(response => {
                  // 假设返回成功时的反馈
                  response;
                  this.$message.success("已成功加入购物车！");
                })
                .catch(error => {
                  // 失败时的反馈
                  console.error('加入购物车失败，请稍后再试。', error);
                  this.$message.error("加入购物车失败，请稍后再试。");
                });
      })
    },
  },
};
</script>

<style scoped>
/* 按钮容器，恢复默认居中 */
.button-container {
  text-align: center;
  margin: 20px 0;
}

/* Tabs 容器，设置居中样式 */
.tabs-container {
  display: flex;              /* 使用 Flex 布局 */
  justify-content: center;    /* 水平居中 */
  margin-top: 20px;           /* 添加顶部间距 */
}

.el-tabs {
  max-width: 800px;           /* 限制 Tabs 宽度 */
  width: 100%;                /* 自适应宽度 */
}
</style>


