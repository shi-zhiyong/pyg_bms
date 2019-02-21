<template>
  <el-card>
    <!--面包屑-->
    <cus-bread
      :level1="level1"
      :level2="level2"></cus-bread>
    <el-table
      class="list"
      :data="tableData"
      stripe
      border
      fit
      v-loading="loading"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="300px">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="80px">
      </el-table-column>
      <el-table-column
        prop="pay_status"
        label="是否付款"
        width="100px">
        <template
          slot-scope="scope">
          <el-tag
            v-if="scope.row.order_pay === '0'"
            type="danger">
            未付款
          </el-tag>
          <el-tag
            v-else
            type="success">
            已付款
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货">
      </el-table-column>
      <el-table-column
        label="下单时间">
        <template
          slot-scope="scope">
          {{scope.row.create_time|fmtdate}}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template
          slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            plain
            @click="addFormVisible = true"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--修改订单对话框-->
    <el-dialog title="修改订单地址"
               :visible="addFormVisible">
      <el-form
        label-position="right"
        label-width="100px">
        <el-form-item label="省市区/县">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange"
            style="width: 200px">
          </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  import cityData from "./city_data2017_element"
  export default {
    name: 'orders',
    data () {
      return {
        level1: '订单管理',
        level2: '订单列表',
        //  订单列表数据
        pagenum: 1,
        pagesize: 10,
        total: 0,
        loading: true,
        tableData: [],
      //  修改订单对话框
        addFormVisible:false,
        selectedOptions:[],
        options:cityData,
      }
    },
    methods: {
      // 加载数据
      async loadData () {
        const res = await this.$http.get('/orders', {
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize
          }
        })
        this.loading = false
        if (res.data.meta.status === 200) {
          this.tableData = res.data.data.goods
          this.total = res.data.data.total
        }
      },
      //级联改变时
      handleChange(){

      }
    },
    created () {
      this.loadData()
    }
  }
</script>

<style
  scoped>
  .list {
    margin-top: 20px;
  }

  .page {
    margin-top: 20px;
  }
</style>
