
import Vue from 'vue'
import App from './App.vue'
import './src/assets/css/global.styl'
import NProgress from './src/plugins/Nprogress'
import './src/plugins/axios'
import router from './src/router';
import store from './src/stores/index'
import './src/plugins/paginator'
import './src/plugins/lodash'
import './src/mixins/history';

Vue.config.productionTip = false

new Vue({
  NProgress,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
