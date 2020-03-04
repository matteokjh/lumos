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