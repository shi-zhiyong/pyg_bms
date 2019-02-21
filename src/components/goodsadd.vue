<template>
  <el-card
    class="box">
    <!--面包屑-->
    <cus-bread
      :level1=" level1"
      :level2=" level2"
    ></cus-bread>
    <!--警告框-->
    <el-alert
      class="alert"
      title="
添加商品信息"
      type="info"
      center
      show-icon>
    </el-alert>
    <!--步骤条-->
    <el-steps
      :active="active-0"
      align-center>
      <el-step
        title="基本信息"></el-step>
      <el-step
        title="商品参数"></el-step>
      <el-step
        title="商品属性"></el-step>
      <el-step
        title="商品图片"></el-step>
      <el-step
        title="商品内容"></el-step>
    </el-steps>
    <el-form
      class="form"
      :model="formData"
      label-width="80px"
      label-position="top">
      <!--tab切换-->
      <el-tabs
        @tab-click="changeTab()"
        v-model="active"
        class="tabs"
        tab-position="left">
        <!--tab1-->
        <el-tab-pane
          label="基本信息"
          name="1">
          <el-form-item
            label="商品名称">
            <el-input
              v-model="formData.goods_name"></el-input>
          </el-form-item>
          <el-form-item
            label="商品价格">
            <el-input
              v-model="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item
            label="商品重量">
            <el-input
              v-model="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item
            label="商品数量">
            <el-input
              v-model="formData.goods_number"></el-input>
          </el-form-item>
          <el-form-item
            label="商品分类">
            selectedOptions{{selectedOptions}}
            <el-cascader
              expand-trigger="hover"
              :options="options"
              v-model="selectedOptions"
              :props="defaultProps"
              clearable
            >
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <!--tab2-->
        <el-tab-pane
          label="商品参数"
          name="2">
          <el-form-item
            :label="item.attr_name"
            v-for="item in checkList"
            :key="item.id"
          >
            <el-checkbox-group v-model="item.attr_vals">
              <el-checkbox
                border
                v-for="(item2,i) in item.attr_vals"
                :key="i"
                :label="item2"
               ></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <!--tab3-->
        <el-tab-pane
          label="商品属性"
          name="3">
          <el-form-item
            v-for="item in staticData"
            :label="item.attr_name"
            :key="item.attr_id"
          >
            <el-input
              v-model="item.attr_vals"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
        <!--tab4-->
        <el-tab-pane
          label="商品图片"
          name="4">
          <el-upload
            :header="headers"
            action="http://localhost:8888/api/private/v1/upload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-tab-pane>
        <el-tab-pane
          label="商品内容"
          name="5">
          <el-button
            @click="submitFormData()"
            type="primary">添加商品</el-button>
          <!--添加富文本编辑器-->
          <quill-editor
          v-model="formData.goods_introduce"
          ></quill-editor>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>

</template>

<script>
  // <!--富文本编辑器的引入使用-->
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";
  import "quill/dist/quill.bubble.css";
  import { quillEditor } from "vue-quill-editor";
  // <!--富文本编辑器的引入使用-->
  export default {
    name: 'goodsadd',
    data () {
      return {
        level1: '商品管理',
        level2: '商品列表',
        active: '1',
        //表单提交数据
        formData: {
          goods_name: '',
          goods_price: '',
          goods_weight: '',
          goods_number: '',
          goods_cat:'',
          goods_introduce: '',
          pics: [
            {'pic': '/tmp_uploads/30f08d52c551ecb447277eae232304b8'}
          ],
          attrs: []
        },
        selectedOptions: [],
        options: [],
        defaultProps: {
          label: 'cat_name',
          value: 'cat_id',
          children: 'children'
        },
        checkList: [],
        staticData:[],
        //提供图片上传的头部
        headers: {
          Authorization:localStorage.getItem("token")
        }
      }

    },
    methods: {
      //添加上商品表单提交
     async submitFormData(){
       // 处理商品分类selectedOptions: []
       this.formData.goods_cat = this.selectedOptions.join(',')
      //  处理属性 参数 里边的数据  checkList: [], staticData:[],
        const arr1 = this.checkList.map(item=>{
          return {'attr_id':item.attr_id,'attr_value':item.attr_vals.join(",")}
        })
        const arr2 = this.staticData.map(item=>{
          return {'attr_id':item.attr_id,'attr_value':item.attr_vals}
        })
       this.formData.attrs = [
         ...arr1,
         ...arr2
       ]
        // console.log(arr1)
        // console.log(arr2)
      //  数据处理完后  发送表单提交
      //   const res = await this.$http.post(`goods`, this.formData);
      //   console.log(res);
       console.log(this.formData)
      },
      //获取上商品三级列表
      async getGoodsList () {
        const res = await this.$http.get(`categories?type=3`)
        const {data, meta: {status}} = res.data
        if (status === 200) {
          this.options = data
          // console.log(this.selectedOptions)
          console.log('这是options数据')
          console.log(this.options)
        }
      },
      //点击tab 激发事件
      async changeTab () {
        if (this.selectedOptions.length === 3) {
          if(this.active === '2'){

            //获取动态数据
            const res = await this.$http.get(`categories/${this.selectedOptions[this.selectedOptions.length - 1]}/attributes?sel=many`)
            console.log('many 数据')
            console.log(res)
            const {data, meta: {status}} = res.data
            if (status === 200) {
              this.checkList = data
              this.checkList.forEach((item)=>{
                item.attr_vals = item.attr_vals.trim().split(",")
                // console.log(this.checkList)
              })
            }
          }
          if(this.active === '3'){

            // 获取静态数据
            const res2 = await this.$http
              .get(`categories/${this.selectedOptions[this.selectedOptions.length - 1]}/attributes?sel=only`)
            console.log('only 数据')
            console.log(res2)
            //对象的结构赋值的另外一种写法  冒号前边的是数据  冒号后边的是接收数据的常量
            const {data:data2, meta: {status:status2}} = res2.data
            if (status2 === 200) {
              this.staticData = data2
              console.log(this.staticData)
            }
          }
        }else {
          if(this.active === "2" || this.active==="3"){
            //没有填写商品分类直接给提示
            this.$message.error("请完先成商品分类信息！")
          }
        }

      },
    //  图片上传移除函数
      handleRemove(file, fileList){
        // console.log(file)
        // console.log(fileList)
        const index = this.formData.pics.findIndex(item=>{
          return item.pic === file.response.data.tmp_path
        })
        this.formData.pics.splice(index,1);
      },
      // 图片上传添加成功函数
      handleSuccess(res, file, fileList){
        console.log(res)
        // console.log(file)
        // console.log(fileList)
        // console.log(this.headers)
        // const temPath = res.data.tem_path
        // this.formData.pics.push({
        //   pic:temPath
        // })
        const {meta:{status,msg}} = res
        if(status === 200){
          this.$message.success(msg)
          const temPath = res.data.tem_path
          this.formData.pics.push({
            pic:temPath
          })
        }
      }
    },
    created () {
      this.getGoodsList()
    },
    components: {
      quillEditor
    },

  }
</script>

<style
  scoped>
  .box {
    height: 100%;
  }

  .alert {
    margin: 20px 0;
  }

  .tabs {
    margin-top: 20px;
  }

  .form {
    height: 400px;
    overflow: auto;
  }

  .ql-editor ,.ql-blank{
     /*height: 200px;*/
    min-height: 200px;

  }

</style>
