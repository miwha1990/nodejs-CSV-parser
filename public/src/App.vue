<template>
  <main id="main">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col">
        </div>
        <div class="col">
          <b-card
                  class="mb-2"
                  title="File uploader"
                  sub-title="Demo version, only .csv files are accepted (saving csv content to database)"
                  show-footer
          >
            <br>
            <b-form-file
                    id="siofu_input"
                    v-model="file"
                    name="file"
                    ref="fileinput"
                    accept=".csv"
                    required></b-form-file>
            <br>

            <small slot="footer" class="text-muted">
              <span v-if="progressBar" class="preloader"><img src="../static/739.gif" alt=""></span>
              <div>
                <b-btn class="mt-4"  @click="clicked">Upload</b-btn>
                <span class="output_msg" v-if="progressBar">Index: {{msg}}</span>
              </div>
            </small>
          </b-card>
        </div>
        <div class="col">
        </div>
      </div>
    </div>


  </main>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import SocketIOFileUpload from 'socketio-file-upload'
  import io from 'socket.io-client'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  export default {
      data() {
          return {
              file:false,
              counter: 45,
              apiUrl : this.$store.getters.getApiUrl,
              progressBar:false
          }
      },
      computed: {
          msg() {
              return this.$store.getters.getMsg;
          }
      },
      methods: {
          clicked(e) {
              this.counter = Math.random() * 100;
              console.log("Change progress to " +
                  Math.round(this.counter * 100) / 100);

              if(this.file) {
                  const formData = new FormData();
                  formData.append('file', this.file);
                  formData.append('fileSize', this.file.size);
                  this.progressBar = true;
                  this
                      .$http.post( this.apiUrl + 'upload', formData)
                      .then(this.onComplete.bind(this))
                      .catch(this.onError.bind(this));
              }

          },
          onComplete(e){
          },
          onError(e) {
          }
      },
      mounted() {
          const vm = this;
          const ws = new WebSocket("ws://localhost:9999");
          ws.onmessage = (e) => {
              vm.$store.commit('SET_MSG', e.data);
              if(e.data === 'finish'){
                  vm.progressBar = false;
              }
          };
      },

  }
</script>

<style>
  .output_msg{
    font-size:20px;
    vertical-align: text-top;
  }
  .preloader{width: 100%; position: relative; display: inline-block;}
  .preloader img{width: 100%;padding-top:15px;height: 30px}
 .custom-file{width: 100%}
</style>
