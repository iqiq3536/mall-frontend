<template>
  <div style="text-align: center; margin-top: 50px;">
    <h1>商品详情页</h1>
    <p>商品 ID: {{ productId }}</p>
    <el-button type="primary" @click="goBack">返回</el-button>
    <el-button>加入购物车</el-button>
    <el-button>购买</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      productId: null, // 存储商品 ID
    };
  },
  created() {
    // 从路由参数获取商品 ID
    this.productId = this.$route.params.id;
  },
  methods: {
    goBack() {
      this.$router.push({ name: "HomePage" }); // 跳转回首页
    },
  },
};
</script>
