<template>
  <div id="app">
    <Layout />
  </div>
</template>
<script>
import Layout from '@/components/Layout';

export default {
  components: { Layout },
  data(){
    return {
      collapsed: false,
      nav: []
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
