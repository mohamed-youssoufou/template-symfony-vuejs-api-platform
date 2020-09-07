import axios from '../../../plugins/axios'


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
        } 
    },
    actions: {
        connectUser: (context, payload) => {
            return axios.post('users', payload)
        }
    }
}

export default users