import Vue from 'vue'
import Vuex from 'vuex'
import UsersModule from './modules/users'
import TodosModule from './modules/todos'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        UsersModule,
        TodosModule
    }
})


export default store