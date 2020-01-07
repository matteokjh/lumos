import fetch from './index'
export const getUserInfo = () => {
    return fetch.get('/')
}