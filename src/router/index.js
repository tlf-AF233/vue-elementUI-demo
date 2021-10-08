import Vue from 'vue'
import VueRouter from 'vue-router'
import UserInfo from '../views/users/userinfo.vue'
import Addusers from '../views/users/addusers.vue'
import Update from '../views/update.vue'
import BillInfo from '../views/bill/BillInfo.vue'
import App from '../App'
import Index from '../views/Index'
import Loading from "element-ui/packages/loading/src";
import HomePage from '../views/homepage'
import Login from '../views/login/login'
import Layout from "@/views/layout/Layout";
import Aside from "@/views/layout/components/sidebar/Aside";
import homepage from "@/views/homepage";
import Info from "@/views/info/Info";
import Author from "@/views/info/Author";
import Error from "@/views/error/404";
import Food from "@/views/food/Food";
import AddDish from "@/views/food/dishes/AddDish";
import DishInfo from "@/views/food/dishes/DishInfo";
import ShopCart from "@/views/food/shopCart/ShopCart";
import Dishback from "@/views/food/dishes/Dishback";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Food,
    redirect: '/food',
    hidden: true,
    children: [
      {
        path: '/food',
        component: DishInfo,
      },
      {
        path: '/shopCart',
        component: ShopCart
      }

    ]
  },
  {
    path: '*',
    component: Error,
    hidden: true
  },
  {
    path: '/login',
    component: Login,
    hidden: true,
  },
  {
    path: '/employees',
    name: '员工管理',
    component: Layout,
    meta: { icon: 'el-icon-menu'},
    children: [
      {
        path: '/employees/employeeInfo',
        name: '查询员工',
        component: UserInfo
      },
      {
        path: '/employees/add',
        name: '添加员工',
        component: Addusers
      },
    ]
  },
  {
    path: '/back',
    component: Layout,
    redirect: '/homepage',
    hidden: true,
    meta: { auth: true },
    children: [
      {
        path: '/homepage',
        component: homepage
      },
      {
        path: '/info',
        component: Info
      },
      {
        path: '/author',
        component: Author
      }
    ]
  },
  {
    path: '/bill',
    name: '帐单管理',
    component: Layout,
    meta: { icon: 'el-icon-school'},
    children: [
      {
        path: '/bill/billinfo',
        name: '账单信息',
        component: BillInfo
      }
    ]
  },
  {
    path: '/dish',
    name: '菜品管理',
    component: Layout,
    meta: { icon: 'el-icon-menu' },
    children: [
      {
        path: '/dish/add',
        name: '添加菜品',
        component: AddDish
      },
      {
        path: '/dish/all',
        name: '查询菜品',
        component: Dishback
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
