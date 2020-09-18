import axios from '../../plugins/axios'

const request = {
    login: (payload) => {
        return axios.post('users', payload)
    }
}

export default request