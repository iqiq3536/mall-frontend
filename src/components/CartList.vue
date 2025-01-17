<template>
  <div>
    <CartItem
        v-for="cart_details in cartDetails"
        :key="cart_details.cart_details_id"
        :selected="cart_details.selected"
        @update-quantity="updateQuantity"
        @delete-item="deleteItem"
        @select-item="selectItem"
    />
  </div>
</template>

<script>
import CartItem from './CartItem.vue';

export default {
  components: {
    CartItem
  },
  props: ['cartDetails'],
  methods: {
    updateQuantity(cart_details, quantity) {
      this.$emit('update-quantity', cart_details, quantity);
    },
    deleteItem(cart_details) {
      this.$emit('delete-item', cart_details);
    },
    selectItem(cart_details) {
      this.$emit('select-item', cart_details);
    }
  }
};
</script>
