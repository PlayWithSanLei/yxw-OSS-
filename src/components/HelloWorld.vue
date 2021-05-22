<template>
  <div>
    <form id="formId">
      <label>上传文档</label>
      <input type="file" @change="inputChange">
      <el-button type="button" @click="put">asdasd</el-button>
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

        console.log(hash)
        console.log(wordArray)
        console.log(files)
        var base64 = Base64.encode(hash)
        console.log(base64)
        window.sessionStorage.setItem('filename', files.name)
        window.sessionStorage.setItem('base64',base64)

        that.file = files
        that.filename = files.name
        that.base64 = base64
        that.Digest = 'SHA256='+base64
        console.log(that.file)
        console.log(that.filename)
        console.log(that.base64)
      }
    },
    put() {
      const name = this.filename
      // const put = this.$http.create({
      //   baseURL: 'http://192.168.43.159:9426/api/v2/oss/objects/',
      //   timeout:10000,
      //   headers: {
      //     'Digest': this.Digest,
      //     "Access-Control-Allow-Origin": "*",
      //     "Access-Control-Allow-Headers": "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token",
      //     "Access-Control-Allow-Methods": "PUT,POST,UPDATE,DELETE,GET,OPTIONS,HEAD",
      //     "Access-Control-Expose-Headers": "Content-Length, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Content-Type",
      //     "Access-Control-Allow-Credentials": "true"
      //   }
      // })
      // put.put(name)
      console.log(this.Digest)
      this.$http.put('oss/objects/image-20210401214330182.png')
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
