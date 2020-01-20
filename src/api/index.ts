import axios, { AxiosRequestConfig } from 'axios'
// import qs from 'qs'


let fetch = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})
// 请求拦截
fetch.interceptors.request.use((config: AxiosRequestConfig)=>{
    // 不是 7牛 的请求就带上 cookie，是 7牛 的请求就不带cookie，以保证 *
    if(config.url && config.url.indexOf('clouddn') === -1) {
        config.withCredentials = true
    }
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