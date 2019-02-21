<template>
    <el-card>
      <!--面包屑-->
      <cus-bread :level1="level1" :level2="level2"></cus-bread>
      <!--Echarts 图表-->
      <div id="main" style="width: 600px;height:400px;"></div>
    </el-card>
</template>

<script>
  import echarts from 'echarts'



  export default {
    name: 'reports',
    data(){
      return{
        level1:"数据统计",
        level2:"数据报表",
        option:{}
      }
    },
    methods:{
     async getElement(){
       const myChart = echarts.init(document.getElementById('main'));
        const { data: { data } } = await this.$http.get(`reports/type/1`)
        // 指定图表的配置项和数据
        const option = {
          title: {
            text: '数据报表'
          },
          tooltip: {
            trigger: 'axis',
          }
        };
        this.option = {...data,...option}
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(this.option);
      }

    },
    mounted() {
      this.getElement()
    }
  }
</script>

<style scoped>
#main{
  margin-top:30px;
}
</style>
