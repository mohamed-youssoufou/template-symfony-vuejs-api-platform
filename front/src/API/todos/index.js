import axios from '../../plugins/axios'

const todos = {
    getTodos : () => {
        return axios.get('todo')
    }
}

export default todos