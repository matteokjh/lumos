import { ArticleProps } from './articles'
import { UserProps } from './user'

export interface CommentProps {
    cid: String // uuid
    content: String // 内容
    createTime: number, // 创建时间
    articleInfo: ArticleProps // 隶属文章
    fatherComment: CommentProps // 父评论
    userInfo: UserProps // 评论者信息
    like: string[] // 谁点赞了
    to: UserProps // 评论谁的
}
