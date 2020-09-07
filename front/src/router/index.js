import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

import NProgress from '../plugins/Nprogress'
import store from '../stores'

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  { path: "*", redirect: "/login"}
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const status = store.getters['UsersModule/getUser'].status
    if (!status && to.path !== '/login') { 
      next({ name : 'login' })
    } else if(status && to.path == '/login') {
      next({ name : 'home'})
    } else {
      next()
    }

})



export default router
