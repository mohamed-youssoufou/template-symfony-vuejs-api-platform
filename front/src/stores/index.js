import Vue from 'vue'
import Vuex from 'vuex'
import UsersModule from './modules/users/get'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        UsersModule
    }
})


export default store