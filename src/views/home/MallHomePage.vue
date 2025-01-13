

<template>
  <div>
    <NavigationBar></NavigationBar>
    <SearchBar></SearchBar>
  </div>

</template>

<script >
import NavigationBar from '@/components/NavigationBar.vue'
import SearchBar from "@/components/SearchBar.vue";
export default {
  name:'App',
  components:{
    NavigationBar,
    SearchBar
  }
}

</script>

<style scoped>

</style>