<template>
  <div>
    <p>这是 ID 为 {{ productId }} 的相关商品面板。</p>
  </div>
</template>

<script>
export default {
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
};
</script>
