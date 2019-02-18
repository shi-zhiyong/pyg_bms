<template>
  <el-card
    class="box-card">
    <!--面包屑-->
    <cus-bread
      :level1=" level1"
      :level2=" level1"></cus-bread>
    <!--表格-->
    <el-table
      class="rightsSable"
      :data="listData"
      height="450"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
          <span v-if="scope.row.level==='3'">四级</span>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: 'rights',
    data () {
      return {
        level1: '权限管理',
        level2: '权限列表',
        listData:[]
      }
    },
    methods:{
      async getRightsUser(){
        // 设置发送请求时的请求头-> axios库 ->找axios中有没有可以设置headers头部的API->看axios文档
        // const AUTH_TOKEN = localStorage.getItem('token')
        // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

        const res = await this.$http.get(`rights/list`)
        console.log(res)
        const {data,meta:{status}} = res.data
        if (status === 200) {
          this.listData = data
        }
      }
    },
    created () {
      this.getRightsUser()
    }
  }
</script>

<style
  scoped>
  .rightsSable{
    margin-top:50px;
  }
</style>
