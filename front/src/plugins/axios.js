import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import CryptoJS from 'crypto-js'

//  cRYPTOjSaESjSON
var CryptoJSAesJson = {
  'stringify': function (cipherParams) {
    var j = { ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64) }
    if (cipherParams.iv) j.iv = cipherParams.iv.toString()
    if (cipherParams.salt) j.s = cipherParams.salt.toString()
    return JSON.stringify(j).replace(/\s/g, '')
  },
  'parse': function (jsonStr) {
    var j = JSON.parse(jsonStr)
    var cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: CryptoJS.enc.Base64.parse(j.ct) })
    if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
    if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
    return cipherParams
  }
}
// 

Vue.use(VueAxios, axios)

const password = '12345'

let config = {
  baseURL: 'https://127.0.0.1:8000/api/',
  headers: { 'content-type': 'application/json' },
  withCredentials: true,
};

const instance = axios.create(config)

instance.interceptors.request.use(
  function(config){
    
    return config
},
  function(error){

    return Promise.reject(error)
});

instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return JSON.parse(JSON.parse(CryptoJS.AES.decrypt(JSON.stringify(response.data), password, {format: CryptoJSAesJson}).toString(CryptoJS.enc.Utf8)))
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default instance;