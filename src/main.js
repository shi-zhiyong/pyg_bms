// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import moment from  'moment'

//引入封装过后的  axios插件
import HttpServer from './components/htttp'
Vue.use(HttpServer);

//引入公共样式
import '@/assets/css/base.css'


// ElementUI其实Vue插件,和VueRouter用法一样  Vue.use(名)
// Vue插件的使用
Vue.use(ElementUI)

Vue.config.productionTip = false

// 全局过滤器 - 处理日期
Vue.filter("fmtdate",(v)=>{
  return moment(v).format('YYYY-MM-DD')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
