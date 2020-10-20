import axios from '../../plugins/axios'

const todos = {
    getTodos : () => {
        return axios.get('todos')
    }
}

export default todos