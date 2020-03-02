import { UserProps } from './user'

export interface ArticleProps {
    _id: string // _id
    aid: string // uuid
    title: string // 标题
    subTitle: string // 副标题
    author: {
        name: string
        avatar: string // 头像
        introduction: string // 介绍
        work: string // 职业
        username: string // 用户名
        likesTotal: number // 作者文章获赞数
        starsTotal: number // 作者文章被收藏数
    } // 作者
    content: string // 内容
    createTime: number // 发布时间
    modifiedTime: number // 最后修改时间
    collectors: string[] // 收藏者
    likers: string[] // 点赞者
    dislikers: string[] // 不爱者
    comments: [] // 评论
    tag: string[] // 标签
    type: ArticleType
    show: boolean // 管理员控制的是否显示
    isLike: boolean // 当前用户是否点赞
    isDislike: boolean
    isStar: boolean // 是否收藏
}

export type ArticleType = 'draft' | 'post'
