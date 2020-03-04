import React, { useContext, useState } from 'react'
import { store } from '@/store'
import { CommentProps } from '@/types/comment'
import { convertComment } from '@/utils/methods'
import CommentList from './CommentList'
import CommentBar from './CommentBar'
import { articleComment } from '@/api/comment'
import '@/styles/CommentBox.sass'
import { ArticleProps } from '@/types/articles'
import { message } from 'antd'

const CommentBox = (props: {
    submit: (obj: Partial<CommentProps>) => void
    commentList: CommentProps[]
    del: (cid: string) => void
    articleInfo: ArticleProps
    refreshComment: () => void
}) => {
    const { submit, commentList, del, articleInfo, refreshComment } = props
    const { userInfo } = useContext(store).state
    const [barKey, setBarKey] = useState('rootC')

    // methods
    // 这个是子评论提交，props.submit 是根评论提交
    const handleSubmit = async (obj: Partial<CommentProps>) => {
        try {
            let res = await articleComment({
                ...obj,
                content: obj.content || '',
                aid: articleInfo.aid,
            })
            if (res.code === 200) {
                refreshComment()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    const clearInput = () => {
        setBarKey(barKey + 1)
    }

    return (
        <div className="CommentBox">
            <p className="title">文章评论</p>
            {/* 输入框 */}
            <CommentBar
                key={barKey}
                clearInput={clearInput}
                submit={submit}
                userInfo={userInfo}
                MAX_LEN={100}
                visible={true}
                placeholder={`请在此输入评论（${100} 字以内）`}
                id="rootC"
            ></CommentBar>
            {/* 主体 */}
            <CommentList
                del={del}
                refresh={refreshComment}
                submit={handleSubmit}
                userInfo={userInfo}
                list={convertComment(commentList)}
            ></CommentList>
        </div>
    )
}

export default CommentBox
