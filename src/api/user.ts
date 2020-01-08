import fetch from './index'
import { LoginProps } from '../components/modals/types/login'

const PREFIX = '/user'

// 获取用户信息
export const getUserInfo = () => {
    return fetch.get(`${PREFIX}/`)
}
// 注册
export const register = (data: LoginProps) => {
    return fetch.post(`${PREFIX}/register`, data)
}
// 重发激活邮件
export const resend = (data: LoginProps) => {
    return fetch.post(`${PREFIX}/resendemail`, data)
}
// 登录
export const login = (data: LoginProps) => {
    return fetch.post(`${PREFIX}/login`, data)
}