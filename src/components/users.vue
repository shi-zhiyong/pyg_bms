<template>
  <el-card
    class="box-card">
    <!--面包屑导航-->
    <el-breadcrumb
      separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        :to="{ path: '/' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        用户管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>
        用户列表
      </el-breadcrumb-item>
    </el-breadcrumb>
    <!--搜索-->
    <el-row>
      <el-col>
        <div
          style="margin-top: 15px;">
          <el-input
            @clear="getAllUsers()"
            clearable
            placeholder="请输入内容"
            v-model="query"
            class="searchInput">
            <el-button
              @click="searchUser()"
              slot="append"
              icon="el-icon-search"></el-button>
          </el-input>
          <el-button
            @click.prevent="showDiaAddUser()"
            type="primary">
            添加用户
          </el-button>
        </div>
      </el-col>
    </el-row>
    <!--表格-->
    <el-table
      :data="formdata"
      style="width: 100%">

      <el-table-column
        prop="id"
        label="#"
        width="80"></el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100"></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="140"></el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
        width="140"></el-table-column>
      <el-table-column
        label="创建日期"
        width="180">
        <template
          slot-scope="scope">
          <p>
            {{scope.row.create_time|fmtdate}}
          </p>
        </template>
      </el-table-column>
      <el-table-column
        label="用户状态"
        width="100">
        <template
          slot-scope="scope">
          <el-switch
            @change="changeStatus(scope.row)"
            v-model="scope.row.mg_state"></el-switch>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="操作">
        <template
          slot-scope="scope">
          <el-button
            @click="showDiaEditUser(scope.row)"
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain></el-button>
          <el-button
            @click="showDiaDelUser(scope.row.id)"
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain></el-button>
          <el-button
            @click.prevent="showDiaRoleUser(scope.row)"
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 8, 16]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--添加用户对话框-->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisibleAdd">
      <el-form
        :model="userdata">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth">
          <el-input
            v-model="userdata.username"
            autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          :label-width="formLabelWidth">
          <el-input
            v-model="userdata.password"
            autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth">
          <el-input
            v-model="userdata.email"
            autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="电话"
          :label-width="formLabelWidth">
          <el-input
            v-model="userdata.mobile"
            autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          @click="dialogFormVisibleAdd = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click=" DiaAddUser()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <!--编辑用户对话框-->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisibleEdit">
      <el-form
        :model="userdata">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth">
          <el-input
            disabled
            v-model="userdata.username"
            autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth">
          <el-input
            v-model="userdata.email"
            autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          label="电话"
          :label-width="formLabelWidth">
          <el-input
            v-model="userdata.mobile"
            autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          @click="dialogFormVisibleEdit = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click=" DiaEditUser()">
          确定
        </el-button>
      </div>
    </el-dialog>
    <!--选择用分配角色对话框-->
    <el-dialog
      title="用户角色"
      :visible.sync="dialogFormVisibleRole">
      <el-form
        :model="userdata">
        <div>
          用户名：{{curentName}}
        </div>
        <el-form-item
          label="活动区域">
          <el-select
            v-model="userRoleId">
            <el-option
              disabled
              label="请选择"
              value="-1"></el-option>

            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          @click="dialogFormVisibleRole = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click=" DiaRoleUser()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  export default {
    name: 'users',
    data () {
      return {
        query: '',
        formdata: [],
        userdata: {
          username: '',
          password: '',
          id: '',
          email: '',
          mobile: ''
        },
        total: -1,
        pagesize: 2,
        pagenum: 1,
        dialogFormVisibleAdd: false,
        dialogFormVisibleEdit: false,
        dialogFormVisibleRole: false,
        formLabelWidth: '120px',
        userRoleId: -1,
        currentUserId: '',
        roles: {},
        curentName: ''
      }
    },
    methods: {
      //编辑用户 角色
      async DiaRoleUser () {
        const res = await this.$http.put(`users/${this.currentUserId}/role`, {rid: this.userRoleId})
        const {meta: {status, msg}} = res.data
        if (status === 200) {
          this.$message.success(msg)
          this.dialogFormVisibleRole = false
        }
      },
      //展示 用户角色展示
      async showDiaRoleUser (user) {
        var res = await this.$http.get('roles')
        const res1 = await this.$http.get(`users/${user.id}`)
        const {data: {data, meta: {status, msg}}} = res
        if (status === 200) {
          this.roles = data
          this.currentUserId = user.id
          this.curentName = user.username
          this.userRoleId = res1.data.data.rid// 设置发送请求时的请求头-> axios库 ->找axios中有没有可以设置headers头部的API->看axios文档
          const AUTH_TOKEN = localStorage.getItem('token')
          this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
        }
        this.dialogFormVisibleRole = true
      },
      //获取用户数据
      handleGetData () {

        this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
          .then((res) => {
            const {data: {data, meta: {status, msg}}} = res
            if (status === 200) {
              this.formdata = data.users
              this.total = data.total
            }
          })
      },
      //点击分页下拉按钮  效果
      handleSizeChange (val) {
        this.pagenum = 1
        this.pagesize = val
        this.handleGetData()
      },
      //点击 分页 页码按钮效果
      handleCurrentChange (val) {
        this.pagenum = val
        this.handleGetData()
      },
      //搜索用户功能（使用 async  await 来自做异步）
      async searchUser () {
        this.pagenum = 1
        this.handleGetData()
      },
      //清空搜索框 获取完整数据
      getAllUsers () {
        this.handleGetData()
      },
      //  展示添加用户  对话框展示
      showDiaAddUser () {
        this.dialogFormVisibleAdd = true
      },
      //添加用户
      async DiaAddUser () {
        const res = await this.$http.post('users', this.userdata)
        const {data: {meta: {msg, status}}} = res
        if (status === 201) {
          this.$message.success(msg)
        }
        this.dialogFormVisibleAdd = false
      },
      //展示编辑用户对话框
      showDiaEditUser (user) {
        this.dialogFormVisibleEdit = true
        this.userdata.username = user.username
        this.userdata.email = user.email
        this.userdata.mobile = user.mobile
        this.userdata.id = user.id
      },
      // 编辑用户
      // id	用户 id	不能为空 参数是url参数:id
      // email	邮箱	可以为空
      // mobile	手机号	可以为空
      async DiaEditUser () {
        this.$http.defaults.headers.common['Authorization'] = localStorage.getItem('token')
        const res = await this.$http.put(`users/${this.userdata.id}`, {
          mobile: this.userdata.mobile,
          email: this.userdata.email
        })
        // console.log(res)
        const {data: {meta: {msg, status}}} = res
        if (status === 200) {
          this.$message.warning(msg)
          this.dialogFormVisibleEdit = false
        }
      },
      //  改变用户状态

  //     请求路径：users/:uId/state/:type
  // 请求方法：put
  // 请求参数
  // 参数名	参数说明	备注
  // uId	用户 ID	不能为空携带在url中
  // type	用户状态	不能为空携带在url中，值为 true 或者 false
      async changeStatus (user) {
        //mg_state
        const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
        const{meta:{status,msg}} = res.data
        if(status === 200){
          this.$message.success(msg)
        }
      },
      // 展示删除用户弹框
      showDiaDelUser (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          const res = await this.$http.delete(`users/${id}`)
          const {data: {meta: {status, msg}}} = msg
          if (status === 200) {
            this.handleGetData()
            this.pagenum = 1
            this.$message({
              type: 'success',
              message: msg
            })
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    },
    created () {
      this.handleGetData()
    },
    mounted () {
      if (!localStorage.getItem('token')) {
        this.$router.push({
          name: 'login'
        })
      }
    }
  }
</script>

<style
  scoped>
  .searchInput {
    width: 400px;
  }
</style>
