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
      <el-aside width="200px" class="aside">
        <!--导航菜单-->
        <!--1-->
        <el-menu
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <span>用户管理</span>
            </template>
              <el-menu-item index="users">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
          </el-submenu>
          <!--2-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-menu"></i>角色列表</el-menu-item>
            <el-menu-item index="1-1"><i class="el-icon-menu"></i>权限列表</el-menu-item>
          </el-submenu>
          <!--3-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-menu"></i>商品商品类表</el-menu-item>
            <el-menu-item index="1-1"><i class="el-icon-menu"></i>分类参数</el-menu-item>
            <el-menu-item index="1-1"><i class="el-icon-menu"></i>商品分类</el-menu-item>
          </el-submenu>
          <!--4-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-menu"></i>订单列表</el-menu-item>
          </el-submenu>
          <!--5-->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1"><i class="el-icon-menu"></i>数据列表</el-menu-item>
          </el-submenu>
        </el-menu>

        <!--导航菜单-->
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
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
    background: #b3c0d1;
  }
  .main{
    background:gray;

  }
</style>
