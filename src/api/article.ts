import fetch from './index'
import { SearchObjProps } from '@/types'

const PREFIX = '/article'

// 获取单篇
export const getArticle = (aid: string) => {
    return fetch.get(`${PREFIX}/`, {
        params: {
            aid,
        },
    })
}
// 获取全部
export const getAllArticles = (searchObj?: SearchObjProps) => {
    return fetch.get(`${PREFIX}/all`, {
        params: searchObj,
    })
}

// 修改 - 需要身份校验
export const saveArticle = (obj: any) => {
    return fetch.post(`/user${PREFIX}/save`, obj)
}
// 发布文章
export const articlePost = (aid: string) => {
    return fetch.put(`/user${PREFIX}/post`, {
        aid,
    })
}
// 删除文章
export const articleDel = (aid: string) => {
    return fetch.delete(`/user${PREFIX}/del`, {
        params: {
            aid,
        },
    })
}
