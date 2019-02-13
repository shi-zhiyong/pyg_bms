<template>
  <el-form :label-position="labelPosition" label-width="80px" :model="formdata">
    <el-form-item label="用户名">
      <el-input v-model="formdata.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formdata.password"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
  export default {
    name: 'login',
    data(){
      return {
        labelPosition:"top",
        formLabelAlign:{
          name:"",
          password:""
        }
      }
    }
  }
</script>

<style scoped>

</style>
