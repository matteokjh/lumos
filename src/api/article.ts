import fetch from './index'
import { SearchObjProps } from '@/types'

const PREFIX = '/article'

// 修改 - 需要身份校验
export const saveArticle = (obj: any) => {
    return fetch.post(`/user${PREFIX}/save`, obj)
}
// 获取单篇
export const getArticle = (aid: string) => {
    return fetch.get(`${PREFIX}/`, {
        params: {
            aid
        }
    })
}
// 获取全部
export const getAllArticles = (searchObj: SearchObjProps) => {
    return fetch.get(`${PREFIX}/all`, {
        params: searchObj
    })
}