<template>
  <el-card>
    <!--面包屑-->
    <cus-bread
      :level1=" level1"
      :level2=" level1"></cus-bread>
    <!--添加按钮-->
    <el-button
      class="addBtn"
      type="primary">
      添加角色
    </el-button>
    <!--表格-->
    <el-table
      class="rolesTable"
      :data="listData"
      height="450"
      border
      style="width: 100%">
      <el-table-column
        type="expand">
        <template
          slot-scope="scope">
          <el-row
            v-for="item1 in scope.row.children"
            :key="item1.id">
            <el-col
              :span="4">
              <el-tag
                @close="handleClose(scope.row,item1.id)"
                closable>
                {{item1.authName}}
              </el-tag>
            </el-col>
            <el-col
              :span="20">
              <el-row
                v-for="item2 in item1.children"
                :key="item2.id"
              >
                <el-col
                  :span="4">
                  <el-tag
                    @close="handleClose(scope.row,item2.id)"
                    closable>
                    {{item2.authName}}
                  </el-tag>
                </el-col>
                <el-col
                  :span="20">
                  <el-tag
                    @close="handleClose(scope.row,item3.id)"
                    v-for="item3 in item2.children"
                    :key="item3.id"
                    type="success"
                    closable>
                    {{item3.authName}}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        label="#"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        width="200"
        label="角色描述">
      </el-table-column>
      <el-table-column
        width="200"
        label="操作">
        <template
          slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="mini"
            plain></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            plain></el-button>
          <el-button
            @click.prevent="showDiaRoles(scope.row)"
            type="success"
            icon="el-icon-check"
            circle
            size="mini"
            plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑角色权限对话框-->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogFormVisibleRoleRights">
      <el-tree
        :data="treeData"
        show-checkbox
        default-expand-all
        :default-checked-keys="defaultCheckedKeys"
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <div
        slot="footer"
        class="dialog-footer">
        <el-button
          @click="dialogFormVisibleRoleRights = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click=" DiaRoleRight()">
          确定
        </el-button>
      </div>
    </el-dialog>
  </el-card>

</template>

<script>
  export default {
    name: 'roles',
    data () {
      return {
        level1: '权限管理',
        level2: '角色列表',
        listData: [],
        dialogFormVisibleRoleRights: false,
        treeData: [],
        defaultProps: {
          label: 'authName',
          children: 'children'
        },
        defaultCheckedKeys: [],
        currentRoleId:""
      }
    },
    methods: {
      //编辑保存数据(角色授权)
  //     请求路径：roles/:roleId/rights
  // 请求方法：post
  // 请求参数
  // 参数名	参数说明	备注
  //   :roleId	角色 ID	不能为空携带在url中
  // rids	权限 ID 列表	以 , 分割的权限 ID 列表
      async DiaRoleRight(){
        // 获取被选这个权限的id
        const checkedKeys = this.$refs.tree.getCheckedKeys()
        // // 获取半选中权限的节点的id
        // const halfCheckedKeys = this.$refs.tree.getHalfCheckedKeys()
        this.defaultCheckedKeys = checkedKeys
        const res = await this.$http.post(`roles/${this.currentRoleId}/rights`,{
          rids:this.defaultCheckedKeys.join(",")
        })
        const {data,meta:{status,msg}} = res.data
        if(status === 200){
          this.$message.success(msg);
          this.dialogFormVisibleRoleRights = false
        }else{
          this.$message.success(msg);
          this.dialogFormVisibleRoleRights = false
        }
      },
      //   编辑分配角色 对话框展示
      async showDiaRoles (roles) {
        this.currentRoleId = roles.id
        this.dialogFormVisibleRoleRights = true
        const res = await this.$http.get('rights/tree')
        const {data, meta: {status}} = res.data
        if (status === 200) {
          this.treeData = data
        }
        const arrId = []
        roles.children.forEach((item1) => {
          item1.children.forEach((item2) => {
            item2.children.forEach((item3) => {
              arrId.push(item3.id)
              this.defaultCheckedKeys = arrId
            })
          })
        })
      },
      //关闭 小标记 事件 关闭权限
      async handleClose (role, rightsid) {
        const res = await this.$http.delete(`roles/${role.id}/rights/${rightsid}`)
        const {data, meta: {status, msg}} = res.data
        if (status === 200) {
          this.$message.success(msg)
          role.children = data
        } else {
          this.$message.success(msg)
        }
      },
      //    加载展示数据
      async loadData () {
        const AUTH_TOKEN = localStorage.getItem('token')
        this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
        const res = await this.$http.get(`roles`)
        const {data, meta: {status}} = res.data
        // console.log(data,status)
        if (status === 200) {
          this.listData = data
        }
      },
    },
    created () {
      this.loadData();
    }
  }
</script>

<style
  scoped>
  .addBtn {
    margin-top: 20px;
  }
</style>
