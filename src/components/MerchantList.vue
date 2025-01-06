<template>
  <div>
    <h3>商家列表</h3>
    <table class="table">
      <thead>
      <tr>
        <th>商家名称</th>
        <th>联系方式</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(merchant, index) in merchants" :key="index">
        <td>{{ merchant.name }}</td>
        <td>{{ merchant.contact }}</td>
        <td>
          <button @click="deleteMerchant(index)">删除</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['merchants'],
  methods: {
    deleteMerchant(index) {
      this.$emit('delete-merchant', index);
    }
  }
}
</script>
