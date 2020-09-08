<template>
  <div class="body-login text-center">
      <form class="form-signin" @submit.prevent="login">
        <img class="orange-logo" :src="'../img/ORANGE_LOGO_rgb.jpg'"/>
        <h1 class="h3 mb-3 font-weight-normal mt-2">Veuillez vous connecter</h1>
        <div class="alert alert-danger mt-1" role="alert" v-if="errors.length !== 0">
          <span class="alert-icon"><span class="sr-only">Danger</span></span>
          <p v-for="error in errors" :key="error.index">{{ error.type }}</p>
        </div>
        <label for="inputEmail" class="sr-only">Login</label>
        <input type="text" id="inputEmail" v-model="user.login" class="form-control" placeholder="Login" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" v-model="user.passwd" class="form-control" placeholder="Password" required>
        <!--div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" autocomplete="off"> Remember me
          </label>
        </div-->
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
      </form>
  </div>
</template>

<script>

const STATUS_USER = true;

import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {

  data: () => {
    return {
        user: {
          login : '', 
          passwd: ''
        },
        errors: []
    }
  },
  computed: {
    ...mapGetters('UsersModule',[
      'getUser'
    ])
  },
  methods: {
    ...mapActions('UsersModule',[
      'connectUser'
    ]),
    ...mapMutations('UsersModule', [
      'setUser'
    ]),
    login : function (){
      this.connectUser({ login: this.user.login,  passwd: this.user.passwd})
          .then((response) => {
            this.errors = []
            let userStatus = response.data

            //console.log(userStatus.status.code)
            if(userStatus.status.code === "800"){
              let login = `${userStatus.items[0].nom} ${userStatus.items[0].prenom}`
              this.setUser({ login: login, status: STATUS_USER })
              this.$router.push({ name: 'home' })
              localStorage.setItem('isAuthentificated', true);
              localStorage.setItem('login', login)
            }else if(userStatus.status.code === "901"){
              this.errors.push({type: "information incorrect"})
            }else{
              this.errors.push({type: "ce client n'existe pas"})
            }
        })
        .catch((error)=> {
          //
        })

    }
  }
}
</script>

<style>

</style>