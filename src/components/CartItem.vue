<template>
  <tr>
    <td>
      <input type="checkbox" :checked="item.selected" @change="selectItem" />
    </td>
    <td>{{ item.product.name }}</td>
    <td>{{ item.product.category }}</td>
    <td>
      <img :src="item.product.img_url" alt="product image" @click="goToProductDetail" />
    </td>
    <td>{{ item.unit_price }}</td>
    <td>
      <input type="number" :checked="item.quantity" @blur="updateQuantity" min="1" />
    </td>
    <td>{{ item.creat_data }}</td>
    <td>
      <button @click="deleteItem">删除</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['item', 'selected'],
  methods: {
    updateQuantity() {
      this.$emit('update-quantity', this.item, this.item.quantity);
    },
    deleteItem() {
      this.$emit('delete-item', this.item);
    },
    selectItem() {
      this.$emit('select-item', this.item);
    },
    goToProductDetail() {
      this.$router.push({ path: `/product/${this.item.product.product_id}` });
    }
  }
};
</script>
