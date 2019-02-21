<template>
  <el-card
    class="box-card">
    <!--面包屑-->
    <cus-bread
      :level1=" level1"
      :level2=" level2"></cus-bread>
    <!--搜索-->
    <el-row>
      <el-col>
        <div
          style="margin-top: 15px;">
          <el-input
            clearable
            placeholder="请输入内容"
            class="searchInput">
            <el-button
              slot="append"
              icon="el-icon-search"></el-button>
          </el-input>
          <el-button
            @click.prevent="showGoodsList()"
            type="primary">
            添加用户
          </el-button>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  export default {
    name: 'goodslist',
    data(){
      return{
        level1:"商品管理",
        level2:"商品列表"
      }
    },
    methods:{
      showGoodsList(){
        this.$router.push({
          name:"goodsadd"
        })
      }
    }
  }
</script>

<style scoped>
  .searchInput{
    width:300px;
  }
</style>
