import fetch from './'
import { CommentSendProps } from '@/types/comment'
const PREFIX = '/comment'

// 发送评论
export const articleComment = (obj: CommentSendProps) => {
    return fetch.post(`${PREFIX}`, obj)
}
// 获取某文章的评论列表
export const getCommentList = (aid: string) => {
    return fetch.get(`${PREFIX}`, {
        params: {
            aid
        }
    })
}
// 获取单条评论
export const getComment = (cid: string) => {
    return fetch.get(`${PREFIX}/one`, {
        params: {
            cid
        }
    })
}
// 点赞评论
export const commentLike = (cid: string) => {
    return fetch.put(`${PREFIX}/like`, {
        cid
    })
}
// 删除评论
export const commentDel = (cid: string) => {
    return fetch.delete(`${PREFIX}/del`, {
        params: {
            cid
        }
    })
}