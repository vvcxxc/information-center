import axios from "axios"
import qs from "qs"
import store from "../store/index"
import { Toast } from "vant"
const config = {
  baseURL: process.env.VUE_APP_BASE_DOMAIN,
  timeout: 10000,
  headers: {
    Accept: "application/json"
  }
}
const instance = axios.create(config)
instance.interceptors.request.use(
  config => {
    store.dispatch("ajaxBefore");
    if (config.method.toLocaleLowerCase() === "post") {
      config.data = qs.stringify(config.data)
    }
    return config
  },
  err => {
    // console.log(err)
    store.dispatch("ajaxAfter")
    return Promise.error(err)
  }
)

instance.interceptors.response.use(
  response => {
    store.dispatch("ajaxAfter")
    if (response.status === 200) {
      return response.data
    } else {
      return Promise.reject(response)
    }
  },
  err => {
    store.dispatch("ajaxAfter")
    const { code, message, response } = err
    if (code === 'ECONNABORTED' || message === 'Network Error') {
        Toast('网络异常，请重新扫码支付')
    }
    if(err)
    if (response) {
      const { status, data } = response
      switch (status) {
        case 400:
          window.console.log("HTTP: 400")
          break
        case 401:
          break
        case 404:
          window.console.log("HTTP: " + 401)
          break
        case 500:
          window.console.log("HTTP: " + 500)
          break
        default:
          window.console.log(data.message)
      }
    }
    return Promise.reject(response || { message: "unkown error" })
  }
)

export default instance
