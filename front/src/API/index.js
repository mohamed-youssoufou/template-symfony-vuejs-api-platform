import axios from '../plugins/axios'

const request = {
    login: (payload) => {
        axios.post('users', payload)
        .then((resultat) => {
            return resultat.data
        })
        .catch((error) => {
            return false
        })
    }
}

export default request