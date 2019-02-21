<template>
    <el-card>
      <!--面包屑-->
      <cus-bread
        :level1='level1'
        :level2='level2'></cus-bread>
      <!--添加商品分类按钮-->
      <el-row class="row-add">
        <el-col :span="24">
          <el-button
            @click="handleShowAddDialog"
            type="success" plain>添加分类</el-button>
        </el-col>
      </el-row>
      <!--表格展示-->
      <el-table
      height="450px"
      :data="list"
      style="width:100%"
      >
        <el-tree-grid
          file-icon="icon icon-file"
          folder-icon="icon icon-folder"
          prop="cat_name"
          label="商品分类"
          treeKey="cat_id"
          parentKey="cat_pid"
          levelKey="cat_level"
          childKey="children"
          width="220"></el-tree-grid>
        <el-table-column
          prop="cat_level"
          label="级别"
          width="180">
          <!-- 级别 -->
          <template slot-scope="scope">
            <span v-if="scope.row.cat_level === 0">一级</span>
            <span v-else-if="scope.row.cat_level === 1">二级</span>
            <span v-else-if="scope.row.cat_level === 2">三级</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="cat_deleted"
          label="是否有效">
          <template slot-scope="scope">
            {{ scope.row.cat_deleted ? '无效' : '有效'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-button   plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
            <el-button   plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加商品的对话框 -->
      <el-dialog title="添加商品分类" :visible.sync="addDialogFormVisible">
        <el-form :model="formData" label-width="100px">
          <el-form-item label="分类名称">
            <el-input v-model="formData.cat_name" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="分类">
            <!-- 这里不用自带的下拉框, 找el-ui中的级联选择器 -->
            <el-cascader
              clearable
              change-on-select
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              :props="defaultProps"
            >
            </el-cascader>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAdd">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
</template>

<script>
  import  ElTreeGrid from 'element-tree-grid'
  export default {
    name: 'categories',
    data(){
      return{
        level1:"商品管理",
        level2:"商品分类",
      //表格数据
        list:[],
        pagenum: 1,
        pagesize: 5,
        total:0,
      //  对话框数据
        addDialogFormVisible : false,
        formData:{
          cat_name:"",
          cat_pid:-1
        },
        options:[],
        selectedOptions:[],
        defaultProps:{
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        }
      }
    },
    methods:{
      //添加分类
      async handleAdd(){
        if(this.selectedOptions.length === 0){
          this.formData.cat_pid = 0
          this.formData.cat_level = 0
        }else{
          this.formData.cat_pid = this.selectedOptions[this.selectedOptions.length-1]
          this.formData.cat_level = this.selectedOptions.length-1
        }
        const { data: resData } = await this.$http.post(`categories`, this.formData)
        if(resData.meta.status === 201){
          this.$message.success('添加成功')
          this.loadData()
          this.addDialogFormVisible = false
        } else {
          this.$message.error(resData.meta.msg)
        }
      },
      //显示 添加分类对话框
      async handleShowAddDialog(){
        this.addDialogFormVisible = true;
        // 加载层级数据
        const { data: resData } = await this.$http.get(`categories?type=2`)
        this.options = resData.data
      },
      //获取商品分类列表
      async loadData(){
        const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
        console.log("商品分类数据")
        console.log(resData)
        const {data: { result, total },meta:{status}} = resData
        if(status === 200){
          this.list = result
          this.total = total
        }
      }
    },
    components:{
      ElTreeGrid
    },
    created () {
      this.loadData()
    }
  }
</script>

<style scoped>
.row-add{
  margin:20px 0
}
</style>
