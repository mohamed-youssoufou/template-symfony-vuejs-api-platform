import axios from '../../../plugins/axios'

const users = {
    
    namespaced: true,

    state: () => ({
        user: {
            login: '',
            status: false
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
            let response = {}

            axios.post('users', payload)
                .then((resultat) => {
                    response = resultat.data
                })
                .catch((error) => {
                    response = false
                })

            if(response !== false){
                context.state.status = response
                return response;
            }

        }
    }
}

export default users