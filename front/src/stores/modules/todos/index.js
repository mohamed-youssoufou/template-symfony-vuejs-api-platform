
import api from '../../../API/todos'

//const loadTodos = api.getTodos()

const todos = {

    namespaced :true,

    state: {
        todos : []
    },
    getters: {
        getTodos: state => {
            return state.todos
        }
    },
    mutations: {
        SET_TODO: (state, payload) => state.todos = payload
    },
    actions: {
        //loadTodos({commit}){
        //    payload = api.getTodos().data
        //    commit('SET_TODO', payload)
        //}
    }

}

export default todos