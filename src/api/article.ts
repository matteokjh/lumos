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
// 获取用户的一篇文章 （编辑用）
export const getUserArticle = (aid: string) => {
    return fetch.get(`/user${PREFIX}/`, {
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
// 获取用户的全部
export const getMyAllArticles = (searchObj?: SearchObjProps) => {
    return fetch.get(`/user${PREFIX}/all`, {
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
// 点赞/取消点赞 文章
export const articleLike = (aid: string) => {
    return fetch.put(`/user${PREFIX}/like`, {
        aid,
    })
}
// dislike/取消 dislike 文章
export const articleDisLike = (aid: string) => {
    return fetch.put(`/user${PREFIX}/dislike`, {
        aid,
    })
}
// 收藏/取消收藏 文章
export const articleStar = (aid: string) => {
    return fetch.put(`/user${PREFIX}/star`, {
        aid,
    })
}
// 上传文章封面图
export const saveArticleHeadPic = (obj: {
    url: string, 
    aid: string
}) => {
    return fetch.put(`/user${PREFIX}/headpic`, obj)
}
// 获取用户收藏的文章
export const getStarArticle = () => {
    return fetch.get(`/user${PREFIX}/getstar`)
}