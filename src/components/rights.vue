<template>
    <div>
      <cus-bread :level1=" level1" :level2=" level1"></cus-bread>
    </div>
</template>

<script>
  export default {
    name: 'rights',
    data(){
      return{
        level1:"权限管理",
        level2:"权限列表"
      }
    }
  }
</script>

<style scoped>

</style>
