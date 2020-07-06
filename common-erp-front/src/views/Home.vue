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
  mounted() {
    var { graphql, buildSchema } = require('graphql');

    var schema = buildSchema(`
      type Query {
        hello: String,
        name: String
      }
    `);

    var root = { hello: () => 'Hello world!' };

    graphql(schema, '{ hello, name }', root).then((response) => {
      console.log('graphql',response);
    });
  },
  methods: {
    changeStatus() {
      this.test = {status: 'after'}
    }
  }
}
</script>
