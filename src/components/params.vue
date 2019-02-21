<template>
  <el-card>
    <!--面包屑-->
    <cus-bread
      level1='商品管理'
      level2='分类参数'></cus-bread>
    <!--弹窗-->
    <el-alert
      class="alert"
      title="注意:只允许为第三级分类设置参数"
      type="warning"
      :closable="false"
      show-icon></el-alert>
    <!--三级联动-->
    <span>请选择商品分类</span>
    {{selectedOptions}}
    <el-cascader
      clearable
      :options="options"
      v-model="selectedOptions"
      :show-all-levels="false"
      :props="{label:'cat_name',value:'cat_id'}"
      expand-trigger="hover"
      @change="handleChange"
    ></el-cascader>
    <!--tabs-->
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane
        label="设置动态参数"
        name="many">
        <el-table
          height="400px"
          :data="dynamicParams"
          style="width:100%"
        >
          <el-table-column
            type="expand"
            width="40"
          >
            <template
              slot-scope="scope">
              <el-tag
                v-for="(item, index) in scope.row.params"
                :key="index"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row, index)">
                {{item}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="showInput">
                +
                New
                Tag
              </el-button>
            </template>

          </el-table-column>
          <el-table-column
            prop="index"
            label="#"
            width="40">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="属性名称"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template
              slot-scope="scope">
              <el-button
                size="mini"
                type="primany"
                icon="el-icon-edit"
                plain></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                plain></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane
        label="设置静态参数"
        name="only">
        <el-table
          height="400px"
          :data="staticParams"
          style="width: 100%">
          <el-table-column
            type="index"
            width="40">
          </el-table-column>
          <el-table-column
            prop="attr_name"
            label="属性名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="attr_vals"
            label="属性值"
            width="180">
          </el-table-column>
          <el-table-column
            label="操作">
            <template
              slot-scope="scope">
              <el-button
                size="mini"
                type="primany"
                icon="el-icon-edit"
                plain></el-button>
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                plain></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

  </el-card>
</template>

<script>
  export default {
    name: 'params',
    data () {
      return {
        //动态编辑 的数据
        inputVisible: false,
        inputValue: '',
        options: [],
        selectedOptions: [],
        activeName: 'many',
        dynamicParams: [],
        staticParams: []
      }
    },
    methods: {
      //动态编辑标签
      async handleClose (tags, index) { //点叉的时候触发
        tags.params.splice(index, 1)
        const catId = tags.cat_id
        const attrId = tags.attr_id
        // console.log(catId, attrId)
        // put携带的对象
        const putData = {
          attr_name: tags.attr_name,
          attr_sel: tags.attr_sel,
          attr_vals: tags.params.join(',')
        }
        const url = `/categories/${catId}/attributes/${attrId}`
        const res = await this.$http.put(url, putData)
        if (res.data.meta.status === 200) {
          this.$message.success('更新成功')
        } else {
          this.$message.error('更新失败')
        }
      },
      async handleInputConfirm (tags) {
        if (this.inputValue.length === 0) {
          this.inputVisible = false
          return
        }
        tags.params.push(this.inputValue)
        // 清空文本框 显示按钮 隐藏文本域
        this.inputValue = ''
        this.inputVisible = false
        // 准备请求的数据
        // 准备url上需要的id
        const catId = tags.cat_id
        const attrId = tags.attr_id
        const putData = {
          attr_name: tags.attr_name,
          attr_sel: tags.attr_sel,
          attr_vals: tags.params.join(',')
        }
        tags.attr_vals = putData.attr_vals
        const url = `/categories/${catId}/attributes/${attrId}`
        const res = await this.$http.put(url, putData)
        if (res.data.meta.status === 200) {
          this.$message.success('更新成功')
        } else {
          this.$message.error('更新失败')
        }
      },
      showInput () {  //动态编辑标签时  input与button的切换
        this.inputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus()
        })
      },
      //tabs切换时触发
      handleClick () {
        this.loadTableData()
      }
      ,
      //当selectedOptions的值改变时触发
      handleChange () {
        if (this.selectedOptions.length === 0) {
          this.dynamicParams = []
          this.staticParams = []
        } else if (this.selectedOptions.length === 3) {
          this.loadTableData()
        }
      }
      ,
      //加载三级级联数据
      async loadOptions () {
        const {data: {data, meta: {status, msg}}} = await this.$http.get(`categories?type=3`)
        if (status === 200) {
          this.options = data
          console.log('三级级联数据')
          console.log(this.options)
        } else {
          this.$message.error(msg)
        }
      }
      ,
      //加载三级分类数据
      async loadTableData () {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning('请选择三级分类')
          return
        }
        const {data: {data, meta: {status, msg}}} =
          await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${this.activeName}`)
        if (status === 200) {
          // 这里边的data是根据this.activeName 的不同  来分别获取  动态 或者是静态参数
          if (this.activeName === 'many') {
            this.dynamicParams = data
            // 动态参数attr_vals -> 数组
            // 在动态参数数组上添加一个属性params 保存
            this.dynamicParams.forEach((item) => {
              // console.log(item.attr_vals)
              const arr = item.attr_vals.trim().split(',').length === 0 ? [] : item.attr_vals.trim().split(',')
              // 动态给对象添加的成员, 数据绑定有问题, 所以用arr去处理
              this.$set(item, 'params', arr)
              // console.log(item.params)
            })
          } else {
            this.staticParams = data
          }
        }
      }
    },
    created () {
      this.loadOptions()
    }
    ,
  }
</script>

<style
  scoped>
  .alert {
    margin: 20px 0;
  }
</style>
