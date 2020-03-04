import React, { useContext, useState, useEffect } from 'react'
import { store } from '@/store'
import { CommentProps } from '@/types/comment'
import { convertComment } from '@/utils/methods'
import CommentList from './CommentList'
import CommentBar from './CommentBar'
import '@/styles/CommentBox.sass'

const CommentBox = (props: {
    submit: (text: string) => void
    commentList: CommentProps[]
    del: (cid: string) => void
}) => {
    const { submit, commentList, del } = props
    const { userInfo } = useContext(store).state
    const [barKey, setBarKey] = useState('rootC')

    useEffect(() => {
        setBarKey(barKey + 1)
    }, [commentList])

    // methods

    return (
        <div className="CommentBox">
            <p className="title">文章评论</p>
            {/* 输入框 */}
            <CommentBar
                key={barKey}
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
                submit={submit}
                list={convertComment(commentList)}
            ></CommentList>
        </div>
    )
}

export default CommentBox
