import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index
  },
  {
    path: '/index',
    name: 'Index',
    label: '首页',
    icon: 'home',
    component: Index
  },
  {
    path: '/home',
    name: 'Home',
    icon: 'cloud-upload',
    label: '上传测试',
    component: () => import("@/views/Home.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export { routes }
export default router
