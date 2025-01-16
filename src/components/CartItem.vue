<template>
  <tr>
    <td>
      <input type="checkbox" :checked="cart_details.selected" @change="selectItem" />
    </td>
    <td>{{ cart_details.product.name }}</td>
    <td>{{ cart_details.product.category }}</td>
    <td>
      <img :src="cart_details.product.img_url" alt="product image" @click="goToProductDetail" />
    </td>
    <td>{{ cart_details.unit_price }}</td>
    <td>
      <input type="number" :checked="cart_details.quantity" @blur="updateQuantity" min="1" />
    </td>
    <td>{{ cart_details.create_data }}</td>
    <td>
      <button @click="deleteItem">删除</button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ['cart_details', 'selected'],
  methods: {
    updateQuantity() {
      this.$emit('update-quantity', this.cart_details, this.item.quantity);
    },
    deleteItem() {
      this.$emit('delete-item', this.cart_details);
    },
    selectItem() {
      this.$emit('select-item', this.cart_details);
    },
    goToProductDetail() {
      this.$router.push({ path: `/product/${this.cart_details.product.product_id}` });
    }
  }
};
</script>
