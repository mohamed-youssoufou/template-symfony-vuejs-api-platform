import api from '../../../API/users'

const users = {
    
    namespaced: true,

    state: () => ({
        user: {
            login: '',
            status: localStorage.getItem('isAuthentificated') || false
        }
    }),
    getters: {
        getUser: state => {
            return state.user
        }
    },
    mutations: {
        setUser: (state, payload) => {
            state.user.login = payload.login
            state.user.status = payload.status
        },
        removeUser(state){
            state.user.login = ""
            state.user.status = false
            localStorage.removeItem('isAuthentificated')
            localStorage.removeItem('login');
        }
    },
    actions: {
        connectUser: (context, payload) => {
            return api.login(payload)
        }
    }
}

export default users