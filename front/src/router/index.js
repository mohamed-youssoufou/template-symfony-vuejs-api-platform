import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Login.vue'
import NProgress from '../plugins/Nprogress'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Home,
  },
  {
    path: '/home',
    name: 'home',
    component: ()=> import('../views/Home.vue') ,
    beforeEnter: (from, to, next)=>{
      if(from.name !== "Login" && !isAuthenticated) next({name: 'Login'})
      next()
    }
  },
  { path: "*", redirect: "/login" }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})

export default router
