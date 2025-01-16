<template>
  <div>
    <div>
      <span>已选商品：{{ selectedCount }} 件</span>
      <span>总价：￥{{ totalAmount }}</span>
    </div>
    <button @click="clearAll">清空购物车</button>
    <button @click="pay" :disabled="selectedCount === 0">支付</button>
    <button @click="toggleAllSelection">{{ allSelected ? '取消全选' : '全选' }}</button>
  </div>
</template>

<script>
export default {
  props: ['selectedCount', 'totalAmount'],
  data() {
    return {
      allSelected: false
    };
  },
  methods: {
    clearAll() {
      this.$emit('clear-all');
    },
    pay() {
      this.$emit('pay');
    },
    toggleAllSelection() {
      this.allSelected = !this.allSelected;
      this.$emit('toggle-all-selection');
    }
  }
};
</script>
