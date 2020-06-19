import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './services/axios.tool' // 导入封装好的axios
// import '@/plugins/sentry'

Vue.config.productionTip = false
console.log('router',router)
Vue.use(Antd)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
