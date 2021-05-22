<template>
  <div>
    <form id="formId">
      <label>上传文档</label>
      <input type="file" @change="inputChange">
      <el-button type="button" @click="put">上传</el-button>
    </form>
  </div>

</template>

<script>
import CryptoJs from 'crypto-js'
import {Base64} from 'js-base64'

export default {
  name: 'HelloWorld',
  data() {
    return {
      file: {},
      filename: '',
      base64: '',
      Digest: ''
    }
  },
  methods: {
    inputChange(e) {
      var that = this
      let files = e.target.files[0]
      let fileReads = new FileReader()
      fileReads.readAsArrayBuffer(files)
      fileReads.onload = function () {
        var wordArray = CryptoJs.lib.WordArray.create(fileReads.result)
        var hash = CryptoJs.SHA256(wordArray).toString()
        var base64 = Base64.encode(hash)
        console.log(base64)
        window.sessionStorage.setItem('filename', files.name)
        window.sessionStorage.setItem('base64',base64)
        that.file = files
        that.filename = files.name
        that.base64 = base64
        that.Digest = 'SHA256='+base64
      }
    },
    put() {
      const name = 'oss/objects/' + this.filename
      console.log(this.Digest)
      this.$http.put(name)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
