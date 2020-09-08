<template>
  <div>
    <header role="banner">
      <nav role="navigation" id="mainNav" class="navbar navbar-dark bg-dark navbar-expand-md" aria-label="Main navigation">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img :src="'../img/ORANGE_LOGO_rgb.jpg'" class="d-inline-block align-bottom mr-3" alt="Back to homepage" title="Back to homepage" width="50" height="50" loading="lazy"/>
            <span class="h1 mb-0">Dashboard</span>
          </a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#orange-navbar-collapse" aria-controls="orange-navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="navbar-collapse justify-content-between collapse" id="orange-navbar-collapse">
            <ul class="navbar-nav">
              
            </ul>
            <ul class="navbar-nav">
              <li class="nav-item dropdown">
                <button type="button" class="nav-link btn btn-link btn-inverse dropdown-toggle d-flex align-items-center" data-toggle="dropdown">
                  <span class="icon-international-globe h4 mb-0 mr-1" aria-hidden="true"></span>
                  <span>Language</span>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a class="dropdown-item" href="#" lang="fr" hreflang="fr">Français</a></li>
                  <li><a class="dropdown-item" href="#" aria-current="page">English</a></li>
                </ul>
              </li>
              <li class="nav-item dropdown">
                <button type="button" class="nav-link btn btn-link btn-inverse dropdown-toggle d-flex align-items-center" data-toggle="dropdown">
                  <span class="svg-avatar mr-1" aria-hidden="true"></span>
                  <span>{{ getUsername }}<span class="text-primary"></span></span>
                </button>
                <ul class="dropdown-menu dropdown-menu-right">
                  <li><a class="dropdown-item" href="#" @click="deconnexion">Me deconnecter</a></li>
                  <!--li><a class="dropdown-item" href="#">Preferences</a></li-->
                </ul>
              </li>
            </ul>
          </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
      </nav>
    </header>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapMutations('UsersModule', [
      'removeUser'
    ]),
    getUsername: () => {
      return localStorage.getItem('login')
    }
  },
  methods: {
    deconnexion(){
      this.removeUser
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>