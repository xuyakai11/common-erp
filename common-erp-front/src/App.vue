<template>
  <div id="app">
    <a-layout id="components-layout-fixed-trigger">
      <a-layout-sider :style="{ overflow: 'auto', minHeight: '100vh', position: 'fixed', left: 0 }">
        <div class="logo" />
        <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
          <a-sub-menu v-for="item in nav" :key="item.id">
            <span slot="title"><a-icon :type="item.icon" />{{item.name}}</span>
            <a-menu-item v-for="v in item.child" :key="v.id">{{v.name}}</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout :style="{ marginLeft: '200px' }">
        <a-layout-header style="background: #fff; padding: 0">
          
        </a-layout-header>
        <a-layout-content :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }">
          <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
export default {
  data(){
    return {
      collapsed: false,
      nav: []
    }
  },
  created() {
    this.getHello()
  },
  methods: {
    getHello() {
      this.get('/user').then(r => {
        if (r.code === 200) {
          this.nav = r.list;
        } else {

        }
      })
    }
  }
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
