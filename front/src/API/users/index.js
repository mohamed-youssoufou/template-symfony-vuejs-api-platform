import axios from '../../API/users'

const request = {
    login: (payload) => {
        return axios.post('users', payload)
    }
}

export default request