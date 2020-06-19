<template>
  <div class="upload-wrap">
    <label class="upload-label">
      <a-icon type="upload" />上传
      <input class="input-file" type="file" @change="upload">
    </label>
    <a-progress v-if="uploadFileChunkrray.length" :percent="percent" status="active" />
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5';


export default {
  props: ['prop'],
  data () {
    return {
      status: '',
      options:{
        chunkSize: 2097152,
        multiple: false,
        accept: ''
      },
      currentChunk: 0,
      chunksLength: 0,
      progress: 0,
      uploadFileChunkrray: []
    }
  },
  created() {
    this.initProp()
  },
  mounted() {
    console.log(this.prop)
  },
  computed: {
    percent() {
      const len = this.chunksLength;
      if(!len) {
        return 0
      }
      return this.progress/len*100
    }
  },
  methods: {
    initProp() {
      this.options = Object.assign(this.options,this.prop)
    },
    async getStartChunk (md5){
      return new Promise((resolve)=>{
        this.get('/filechunk', { md5 }).then(r=>{
          resolve(r.data)
        })
      })
    },
    async upload (e) {
      let files = e.target.files
      if(!files.length) {
        console.log('未选取文件')
        return 
      }
      const md5 = await this.calculateMD5(files[0]);
      this.currentChunk = await this.getStartChunk(md5);
      console.log(currentChunk)
      this.uploadFileChunkrray = await this.getUploadFileChunkrray(md5,files[0]);
      console.log('uploadFileChunkrray', this.uploadFileChunkrray)
      this.uploading()
      console.log(files)
    },
    uploading(){
      this.uploadFileChunkrray[this.progress].then(r=>{
        if(r.code === 200) {
          if(this.progress<this.uploadFileChunkrray.length){
            this.progress++;
            this.uploading()
          }
        }
      }).catch(r=>{

      })
    },
    async getUploadFileChunkrray(md5, file) {
      return new Promise((resolve) => {
        let blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,  
            chunkSize = this.options.chunkSize,  
            chunks = Math.ceil(file.size / chunkSize),  
            currentChunk = this.currentChunk,
            arr = [];
            
        for(; currentChunk < chunks; currentChunk++){
          let form = new FormData(),
              start = currentChunk * chunkSize,  
              end = start + chunkSize >= file.size ? file.size : start + chunkSize;  
          form.append('file', blobSlice.call(file, start, end));
          form.append('name', file.name);
          form.append('total', chunks);
          form.append('index', currentChunk);
          form.append('chunkSize', chunkSize);
          form.append('hash', md5); 
          const axiosOptions = {
            onUploadProgress: e => {
              // 处理上传的进度
              console.log(chunks, currentChunk, e, file);
            }
          }
          arr.push(this.post('/file/upload', form))
        }
        resolve(arr)
      })
    },
    async calculateMD5(file) {  
      return new Promise((resolve) => {
        let fileReader = new FileReader(),  
            blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice,  
            chunkSize = this.options.chunkSize,  
            // read in chunks of 2MB  
            chunks = Math.ceil(file.size / chunkSize),  
            currentChunk = 0,  
            spark = new SparkMD5.ArrayBuffer();
        this.chunksLength = chunks;
        fileReader.onload = function(e) {  
          spark.append(e.target.result); // append binary string  
          currentChunk++;  

          if(currentChunk < chunks) {  
            loadNext();  
          } else {  
            resolve(spark.end())
          }  
        }
        function loadNext() {  
          let start = currentChunk * chunkSize,  
              end = start + chunkSize >= file.size ? file.size : start + chunkSize;  

          fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));  
        }
        loadNext();  
      })
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.upload-wrap {
  cursor: pointer;
  .upload-label {
    position: relative;
    display: inline-block;
    padding: 4px 8px;
    text-align: center;
    min-width: 80px;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    background-color: #1890ff;
    border-color: #1890ff;
  }
  .input-file {
    display: inline-block;
    width: 0;
    // position: absolute;
    // top: 0;
    // opacity: 0;
  }
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
