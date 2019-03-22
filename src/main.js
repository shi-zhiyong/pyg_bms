// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
//下边这两个文件没有用到cdn引入  所以不用修改
import moment from  'moment'
import cusBread from './components/cusBread'

//引入封装过后的  axios插件
import HttpServer from './components/http'
Vue.use(HttpServer);

//引入公共样式
import '@/assets/css/base.css'


// ElementUI其实Vue插件,和VueRouter用法一样  Vue.use(名)
// Vue插件的使用
Vue.use(ELEMENT)

Vue.config.productionTip = false

// 全局过滤器 - 处理日期
Vue.filter("fmtdate",(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

//注册全局组件
Vue.component(cusBread.name,cusBread)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
