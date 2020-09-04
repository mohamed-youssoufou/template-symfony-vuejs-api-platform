import Vue from 'vue'
import NProgress from 'nprogress'


Vue.use(NProgress)

NProgress.configure({ minimum: 0.1, easing: 'ease', speed: 500 });

export default NProgress