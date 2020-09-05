<template>
  <div class="body-login text-center">
      <form class="form-signin">
        <img class="orange-logo" :src="'../img/ORANGE_LOGO_rgb.jpg'"/>
        <img class="mb-4" src="/docs/4.5/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" id="inputEmail" v-model="user.login" class="form-control" placeholder="Email address" required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" v-model="user.password" class="form-control" placeholder="Password" required>
        <div class="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" autocomplete="off"> Remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" @click="login()" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">&copy; 2017-2020</p>
      </form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'

export default {

  data: () => {
    return {
        user: {
          login : '', 
          password: ''
     }
    }
  },
  methods: {
    ...mapActions('UsersModule',[
      'connectUser'
    ]),
    login : function (){
        //console.log(this.user.password);
        let state = this.connectUser({ login: "oki",  passwd: "oki"})

        console.log(state)

    }
  }
}
</script>

<style>

</style>