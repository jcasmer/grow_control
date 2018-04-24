<template>
  <q-page>
    <div class="">
      <div class=""></div>
    </div>
    <div class="bg-home"></div>
    <div class="title">
      <div class="container-form">
        <h4>Bienvenido</h4>
        <small>Ingresa tus datos</small>
        <div class="text-left">
          <q-input @keyup.enter="simulateProgress" v-model="credentials.username" float-label="Usuario" />
          <div class="lbl-error" v-if="errors.username != 0 && errors.username != null">
              {{ errors.username[0] }}
          </div>
          <br>
          <q-input type="password" @keyup.enter="simulateProgress" v-model="credentials.password" float-label="Contraseña" />
          <div class="lbl-error" v-if="errors.password != 0 && errors.password != null">
              {{ errors.password[0] }}
          </div>
          <div class="lbl-error" v-if="errors.detail != 0 && errors.detail != null">
              {{ errors.detail[0] }}
          </div>
          </div>
          <br />
          <div class="text-center">
            <q-btn loader color="blue" @click="simulateProgress">Ingresar</q-btn>
          </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'Login',
  data () {
    return {
      credentials: {
        username: '',
        password: ''
      },
      errors: {
        username: [],
        password: [],
        detail: []
      }
    }
  },
  methods: {
    login (callback) {
      this.$axios.post('/login/login/', {
        'username': this.credentials.username,
        'password': this.credentials.password
      }).then(response => {
        // if (response.data['is_superuser'] === false) {
        //   this.$router.push({path: '/login'})
        //   this.$root.alertNotify('negative', 'Acceso denegado', 'red', 'thumb_down', 'top')
        //   for (var i in this.credentials) {
        //     this.credentials[i] = ''
        //     this.errors = []
        //   }
        //   callback()
        // }
        LocalStorage.setItem('username', this.credentials.username)
        LocalStorage.setItem('full_name', response.data['full_name'])
        LocalStorage.setItem('token', response.data['token'])
        LocalStorage.setItem('is_superuser', response.data['is_superuser'])/** estructuradel token */
        this.credentials.username = ''
        this.credentials.password = ''
        this.$router.push({path: '/'})
        callback()
      }).catch(error => {
        this.errors = []
        this.errors = error.response.data
      })
    },
    simulateProgress (e, done) {
      this.login(done)
    }
  },
  created: function () {
    this.$root.removeStorage()
  }
}
</script>

<style scoped>
.bg-home{
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}
.title {
    padding: 30px;
    width: 600px;
    font-size: 18px;
    text-align: center;
    animation-name: fade-up;
    margin-top: 8%;
  }
.lbl-error {
  color: #ec2f2f !important;
}
@keyframes fade-up{
    0%   {opacity: 0}
    50%   {opacity: 0; margin-top: 150px;}
    100% {opacity: 1; margin-top: 8%;}
}
.title img{
    width: 350px;
  }
  .container-form{
    background: rgba(255, 255, 255, 0.829);
    width: 350px;
    margin: auto;
    padding: 20px;
    box-shadow: 0 0 10px white;
    border-radius: 5px;
  }
  .bg-star{
    position: fixed;
    width: 100%;
    height: 100%;
    background: linear-gradient(-90deg, #1f4399, #22c0f0);
    text-align: center;
    z-index: -10;
    top: 0;
    left: 0;
  }
@keyframes fade-star{
    0%   {opacity: 0; opacity: 1; z-index: 10}
    50%   {opacity: 0; opacity: 1; z-index: 10}
    100% {opacity: 1; opacity: 0; z-index: 10}
}
  .Logo-co{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: 500px;
    background-position: center;
    background-repeat: no-repeat;
  }
  h4{
    line-height: 0px !important;
  }
  h4, b {
    color: #1f4399;
  }
  small {
    position: relative;
    top: -30px;
    bottom: -15px;
}
@media (max-width: 1970px){
  .bg-home{
    background-size: 100%;
  }
  }
  @media (max-width: 1400px){
  .bg-home{
    background-size: 100%;
  }
  .title {
    margin-top: 5%;
  }
  .title img{
    width: 200px;
  }
  @keyframes fade-up{
    0%   {opacity: 0}
    50%   {opacity: 0; margin-top: 150px;}
    100% {opacity: 1; margin-top: 5%;}
  }
  }
  @media (max-width: 800px){
  .bg-home{
    background-size: auto 100%;
  }
  .container-form{
    width: 100%;
  }
  .title {
    margin-top: 4%;
    padding: 20px;
    width: 100%;
  }
  .title img{
    width: 200px;
  }
  @keyframes fade-up{
    0%   {opacity: 0}
    50%   {opacity: 0; margin-top: 150px;}
    100% {opacity: 1; margin-top: 5%;}
  }
  .emtelco{
    position: fixed;
    bottom: 20px;
    right: 20px;;
    width: 150px;
  }
  .Logo-co{
    background-size: 90%;
  }
  small {
    position: relative;
    top: -15px;
    bottom: -15px;
  }
  }
</style>
