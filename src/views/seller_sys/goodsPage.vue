<template>
  <div>
    <MerchantForm @add-merchant="addMerchant" />
    <MerchantList :merchants="merchants" @delete-merchant="deleteMerchant" />
  </div>
</template>

<script>
import MerchantForm from '@/components/MerchantForm.vue';
import MerchantList from '@/components/MerchantList.vue';

export default {
  components: {
    MerchantForm,
    MerchantList
  },
  data() {
    return {
      merchants: []
    }
  },
  methods: {
    addMerchant(merchant) {
      this.merchants.push(merchant);
    },
    deleteMerchant(index) {
      this.merchants.splice(index, 1);
    }
  }
}
</script>
