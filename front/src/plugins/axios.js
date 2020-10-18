import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

const config = {
  baseURL: 'https://127.0.0.1:8000/api/',
  headers: { 'content-type': 'application/json' },
  withCredentials: true,
};

axios.interceptors.request.use(
  function(config){

},
  function(error){

});

const instance = axios.create(config)

export default instance;