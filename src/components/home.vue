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
            href="#" @click.prevent="loginout()" class="loginout">退出</a>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!--导航菜单-->
        <!--1-->
        <el-menu
          v-for="(item1,index) in menuData"
          :key="item1.id"
          :router="true"
          :unique-opened="true"
          default-active="2"
          class="el-menu-vertical-demo">
          <el-submenu :index="index+1+''">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
              <el-menu-item
                v-for="item2 in item1.children"
                :key="item2.id"
                :index="item2.path">
                <i class="el-icon-menu"></i>
                {{item2.authName}}
              </el-menu-item>
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
  data(){
    return{
      menuData:[]
    }
  },
  methods:{
    loginout(){
      localStorage.clear();
      this.$router.push({
        name:"login"
      })
      this.$message.warning("退出成功");
    },
    async getMenus() {
      const res = await this.$http.get(`menus`);
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
      const {data,meta:{status}} = res.data
      if(status === 200){
        this.menuData = data
      }
    }
  },
  created(){
    this.getMenus()
  },
  mounted () {
    const token = localStorage.getItem("token");
    if(!token){
      this.$router.push({
        name:"login"
      })
    }
  },

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
