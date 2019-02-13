<template>
  <div class="login-wrap">
    <el-form class="login-form" label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click.prevent="handlelogin()"  class="login-btn" type="primary">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods:{
    // handlelogin() {  //如果发送请求没有反应  应该就是数据库启动dos窗口卡死了  CTRL+c 试一试
    //   this.$http
    //     .post(`login`, this.formdata)
    //     .then(res => {
    //       const {
    //         data:{data:{token},meta},
    //         status
    //       } = res
    //       if(meta.status === 200){
    //         localStorage.setItem ("token",token)
    //         console.log(token)
    //         this.$router.push({
    //           name:"home"
    //         })
    //         // console.log(data)
    //       }else{
    //         this.$message.error(meta.msg);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }



  async  handlelogin() {  //如果发送请求没有反应  应该就是数据库启动dos窗口卡死了  CTRL+c 试一试
    const res = await this.$http.post(`login`, this.formdata)
    const {data:{data:{token},meta:{status,msg}}} = res
    if(status === 200){
      localStorage.setItem("token",token)
      this.$router.push({
        name:"home"
      })
    }else{
      this.$message.error(msg)
    }
    }


  },

}
</script>

<style>
  .login-wrap {
    height: 100%;
    background-color: #324152;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .login-form {
    background-color: #ffffff;
    width: 400px;
    border-radius: 5px;
    padding: 30px;
  }
  .login-btn {
    width: 100%;
  }
</style>
