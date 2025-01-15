<template>
  <el-card class="comment-section">
    <h2>商品评价</h2>
    <p>当前商品 ID：{{ productId }}</p>
    <el-row v-if="loading" justify="center">
      <el-spinner size="large"></el-spinner>
    </el-row>
    <el-row v-else>
      <div v-if="comments.length === 0" class="no-comments">
        <p>暂无评论。</p>
      </div>
      <div v-else>
        <el-row
            v-for="comment in comments"
            :key="comment.rating_id"
            class="comment-card"
        >
          <!-- 用户信息在左 -->
          <el-col :span="6" class="user-info">
<!--            <div class="user-avatar">-->
<!--              <img-->
<!--                  src="https://via.placeholder.com/80"-->
<!--                  alt="用户头像"-->
<!--              />-->
<!--            </div>-->
            <div class="username">{{ comment.username }}</div>
          </el-col>

          <!-- 评论内容在右 -->
          <el-col :span="18" class="comment-content">
            <div class="comment-header">
              <el-rate
                  v-model="comment.rating"
                  disabled
                  show-text
                  :max="5"
              ></el-rate>
              <span class="rating-date">{{ formatDate(comment.rating_date) }}</span>
            </div>
            <div class="comment-body">
              <p class="review">{{ comment.review }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </el-card>
</template>


<script>
import axios from "axios";

export default {
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [], // 存储评论数据
      loading: true, // 是否加载中
    };
  },
  methods: {
    fetchComments() {
      const apiUrl = `http://localhost:8081/api/ratings/${this.productId}`;
      axios
          .get(apiUrl)
          .then((response) => {
            this.comments = response.data;
          })
          .catch((error) => {
            console.error("获取评论失败：", error);
            this.comments = [];
          })
          .finally(() => {
            this.loading = false;
          });
    },
    formatDate(dateString) {
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  mounted() {
    this.fetchComments();
  },
};
</script>




<style scoped>
.comment-section {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

h2 {
  margin-bottom: 20px;
  color: #333;
}

.no-comments {
  text-align: left;
  color: #999;
  font-size: 14px;
}

.comment-card {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.user-info {
  text-align: center;
}

.user-avatar img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 1px solid #ddd;
}

.username {
  font-weight: bold;
  font-size: 14px;
  color: #333;
}

.comment-content {
  padding-left: 15px;
  text-align: left;
  flex-grow: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.rating-date {
  font-size: 12px;
  color: #999;
}

.comment-body {
  font-size: 14px;
  color: #444;
  line-height: 1.5;
}

.review {
  margin: 0;
}
</style>




