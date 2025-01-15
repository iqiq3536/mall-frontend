

<template>
  <div>
    <NavigationBar></NavigationBar>
    <SearchBar></SearchBar>
    <ProductList></ProductList>
    <LoginPrompt></LoginPrompt>
  </div>
</template>

<script >
import NavigationBar from '@/components/NavigationBar.vue'
import SearchBar from "@/components/SearchBar.vue";
import ProductList from "@/components/ProductList.vue";
import LoginPrompt from "@/components/LoginPrompt.vue";
export default {
  name:'App',
  components:{
    NavigationBar,
    SearchBar,
    ProductList,
    LoginPrompt
  }

}

</script>

<style scoped>

</style>