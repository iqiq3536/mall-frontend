<template>
  <div>
    <SearchResult></SearchResult>
  </div>
</template>

<script>
import SearchResult from "@/components/SearchResult.vue";

export default {
  name: "AP",
  mounted() {
    console.log("接收到的搜索关键词：", this.$route.query.query);
  },
  components:{
    SearchResult,
  },

};
</script>
