

<template>
  <div>
    <NavigationBar></NavigationBar>
    <SearchBar></SearchBar>
    <ProductList></ProductList>
  </div>
</template>

<script >
import NavigationBar from '@/components/NavigationBar.vue'
import SearchBar from "@/components/SearchBar.vue";
import ProductList from "@/components/ProductList.vue";
export default {
  name:'App',
  components:{
    NavigationBar,
    SearchBar,
    ProductList
  }

}

</script>

<style scoped>

</style>