export interface ArticleProps {
    aid: string, // uuid
    title: string // 标题
    subTitle: string, // 副标题
    author: string // 作者
    content: string // 内容
    createTime: number // 发布时间
    modifiedTime: number // 最后修改时间
    likeNum: number // 获赞数
    commentNum: number // 评论数
    collectNum: number // 收藏数
    tag: string[] // 标签
    type: 'draft' | 'post'
}
