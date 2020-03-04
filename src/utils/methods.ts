import { CommentProps, ConvertedCommentProps } from '@/types/comment'

// 防抖
export const debounce = (Fn: any, ...args: any) => {
    let timerId: any = null
    return () => {
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
        timerId = setTimeout(() => {
            Fn(...args)
        }, 300)
    }
}
// 处理日期
export const formatDate = (time: number) => {
    if (!time) return ''
    return new Date(time).toLocaleDateString()
}
// 处理数字
export const formatNumber = (num?: number) => {
    if (num !== undefined) {
        if (num > 99999999) {
            return `100 M+`
        } else if (num > 999999) {
            return `${~~(num / 1000000)}M+`
        } else if (num > 999) {
            return `${~~(num / 1000)}K+`
        } else return num
    } else return 0
}
// 转化评论列表
export const convertComment = (commentList: CommentProps[]) => {
    let list = [] as ConvertedCommentProps[]
    let map = new Map()
    let arr: ConvertedCommentProps[] = [...commentList]
    // 先把根评论的 id 加入映射
    for (let comment of arr) {
        // 没有父评论的，是根评论
        if (!comment.fatherComment) {
            comment.children = []
            map.set(comment.cid, comment)
        } else {
            // 子评论入栈
            list.push(comment)
        }
    }
    // 遍历子评论，放在对应父评论的子集
    for (let childComment of list) {
        let fatherId = childComment.fatherComment.cid
        if (map.get(fatherId)) {
            let father = map.get(fatherId)
            map.set(fatherId, father.children.push(childComment))
        }
    }
    return [...map.values()]
}
