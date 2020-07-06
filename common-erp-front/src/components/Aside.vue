<template>
  <a-menu theme="dark" mode="inline" :defaultSelectedKeys="defaultSelectedKeys">
    <a-menu-item v-for="item in nav" :key="item.path">
      <router-link :to="{ path: item.path }">
        <a-icon :type="item.icon" /> {{ item.name }}
      </router-link>
      <!-- <span slot="title">{{item.name}}</span>
      <a-menu-item v-for="v in item.child" :key="v.id">{{v.name}}</a-menu-item> -->
    </a-menu-item>
  </a-menu>
</template>
<script>
import { routes } from '@/router'
export default {
  name: 'Aside',
  data(){
    return {
      collapsed: false,
      nav: [],
      defaultSelectedKeys: ['/index']
    }
  },
  mounted() {
    this.getNav()
  },
  methods: {
    getNav() {
      this.nav = routes.slice(1).map(v => {
        return {
          name: v.label,
          icon: v.icon,
          path: v.path
        }
      })
    }
  },
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
#components-layout-fixed-trigger .logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
.ant-layout.ant-layout-has-sider {
  min-height: 100vh;
}
</style>
