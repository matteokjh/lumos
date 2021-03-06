import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.withCredentials = true;

let fetch = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000'
})
// 请求拦截
fetch.interceptors.request.use((config: AxiosRequestConfig)=>{
    config.withCredentials = true
    return config
})
// 响应拦截
fetch.interceptors.response.use(data=> {
    return data.data
}, err => {
    if (err.response) {
        if (err.response.status === 500) {
            console.log('服务器错误，请联系管理员处理')
        }
        return Promise.reject(err.response.data)
    } else {
        return Promise.reject(err)
    }
})

export default fetch