<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4"><div class="grid-content bg-purple"></div>
          <img src="@/assets/logo.png" alt="图片加载失败">
        </el-col>
        <el-col :span="19" class="middle"><div class="grid-content bg-purple-light"></div>
          <h2>电商管理系统</h2>
        </el-col>
        <el-col :span="1"><div class="grid-content bg-purple"></div>
          <a
            href="#" class="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default{
}
</script>

<style scoped>
  .middle{
    line-height:60px;
    text-align:center;
  }
  .loginout{
    line-height:50px;
    text-decoration: none;
  }
  .container{
    height:100%;

  }
  .header{
    background: #b3c0d1;
    height:60px;
  }
  .aside{
    background:green;
  }
  .main{
    background:orange;

  }
</style>
