import { ArticleProps } from './articles'
import { UserProps } from './user'
// 评论信息
export interface CommentProps {
    cid: string // uuid
    content: string // 内容
    createTime: number // 创建时间
    articleInfo: ArticleProps // 隶属文章
    fatherComment: CommentProps // 父评论
    userInfo: UserProps // 评论者信息
    like: string[] // 谁点赞了
    to: UserProps // 评论谁的
    isLiked?: boolean // 用户是否赞了
    canDel?: boolean // 用户是否可以删除
}
// 转换后的评论信息
export interface ConvertedCommentProps extends CommentProps {
    children?: CommentProps[] // 子评论，最多只有一级
}

// 发送评论
export interface CommentSendProps {
    content: string
    aid: string
}
