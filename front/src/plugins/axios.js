import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const instance = axios.create({
  baseURL: 'http://localhost:8000/api/',
  headers: { 'content-type': 'application/json' },
  withCredentials: true,
})

export default instance;