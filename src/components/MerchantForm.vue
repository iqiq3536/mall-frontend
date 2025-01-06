<template>
  <div>
    <h3>添加商家</h3>
    <div>
      <label>商家名称：</label>
      <input v-model="newMerchant.name" type="text" />
    </div>
    <div>
      <label>联系方式：</label>
      <input v-model="newMerchant.contact" type="text" />
    </div>
    <button @click="addMerchant">添加</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newMerchant: {
        name: '',
        contact: ''
      }
    }
  },
  methods: {
    addMerchant() {
      this.$emit('add-merchant', this.newMerchant);
      this.newMerchant = { name: '', contact: '' };
    }
  }
}
</script>
