import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/components/home'
// import Login from '@/components/login'
// import Users from '@/components/users'
// import Rights from '@/components/rights'
// import Roles from '@/components/roles'
// import Goods from '@/components/goods'
// import Goodsadd from '@/components/goodsadd'
// import Params from '@/components/params'
// import Categories from '@/components/categories'
// import Orders from '@/components/orders'
// import Reports from '@/components/reports'


//懒加载模式改造

const Home = ()=> import('@/components/home')
const Login = ()=> import('@/components/login')
const Users = ()=> import('@/components/users')
const Rights = ()=> import('@/components/rights')
const Roles = ()=> import('@/components/roles')
const Goods = ()=> import('@/components/goods')
const Goodsadd = ()=> import('@/components/goodsadd')
const Params = ()=> import('@/components/params')
const Categories = ()=> import('@/components/categories')
const Orders = ()=> import('@/components/orders')
const Reports = ()=> import('@/components/reports')


import {Message} from 'element-ui'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          name:"users",
          path:"/users",
          component:Users
        },
        {
          name:"rights",
          path:"/rights",
          component:Rights
        },
        {
          name:"roles",
          path:"/roles",
          component:Roles
        },
        {
          name:"goods",
          path:"/goods",
          component:Goods
        },
        {
          name:"goodsadd",
          path:"/goodsadd",
          component:Goodsadd
        },
        {
          name:"params",
          path:"/params",
          component:Params
        },
        {
          name:"categories",
          path:"/categories",
          component:Categories
        },
        {
          name:"orders",
          path:"/orders",
          component:Orders
        },{
          name:"reports",
          path:"/reports",
          component:Reports
        }

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})


//路由卫士
VueRouter.beforeEach((to, from, next) => {
  // console.log(to)
  // console.log(from)
  if(to.name === "login"){
    next()
  }else{
    const token = localStorage.getItem("token");
    if(!token){
      Message.warning("请先登录");
      VueRouter.push({
        name: 'login'
      })
      return
    }
    next()
  }
})


export default VueRouterrouter
