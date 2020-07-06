<template>
  <div class="about">
    <h1>Index</h1>
    <a-button type="primary" @click="request">
      请求
    </a-button>
  </div>
</template>
<script>

export default {
  data(){
    return {

    }
  },
  created() {
    this.getHello()
  },
  methods: {
    request(){
      this.get('/test/cookie').then(r => {
        if (r.code === 200) {

        } else {

        }
      })
    },
    getHello() {
      this.get('/user').then(r => {
        if (r.code === 200) {
          
        } else {

        }
      })
    }
  }
}
</script>
