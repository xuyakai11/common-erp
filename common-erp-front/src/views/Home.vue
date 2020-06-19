<template>
  <div class="home">
    <UpladFile :prop="prop" />

  </div>
</template>
<script>
import UpladFile from '@/components/UpladFile.vue';
// @ is an alias to /src
export default {
  name: 'home',
  components: {
    UpladFile
  },
  data() {
    return {
      msg: '',
      prop: {
      }
    }
  },
  methods: {
    changeStatus() {
      this.test = {status: 'after'}
    }
  }
}
</script>
