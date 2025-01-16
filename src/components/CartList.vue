<template>
  <div>
    <CartItem
        v-for="item in cartDetails"
        :key="item.cart_details_id"
        :item="item"
        :selected="item.selected"
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
    updateQuantity(item, quantity) {
      this.$emit('update-quantity', item, quantity);
    },
    deleteItem(item) {
      this.$emit('delete-item', item);
    },
    selectItem(item) {
      this.$emit('select-item', item);
    }
  }
};
</script>
