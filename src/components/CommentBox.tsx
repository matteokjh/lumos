import React, { useState, useContext } from 'react'
import { Button } from 'antd'
import { store } from '@/store'
import '@/styles/CommentBox.sass'
import { CommentProps, ConvertedCommentProps } from '@/types/comment'
import { convertComment } from '@/utils/methods'

const CommentItem = (props: { commentInfo: ConvertedCommentProps }) => {
    const { commentInfo } = props
    return (
        <div className="commentItem">
            <p>{commentInfo.userInfo.name}：{commentInfo.content}</p>
            {commentInfo.children?.length ? (
                <CommentList list={commentInfo.children}></CommentList>
            ) : (
                ''
            )}
        </div>
    )
}

const CommentList = (props: { list: ConvertedCommentProps[] }) => {
    const { list } = props
    return (
        <div className="commentList">
            {list.length
                ? list.map(e => <CommentItem key={e.cid} commentInfo={e}></CommentItem>)
                : ''}
        </div>
    )
}

const CommentBox = (props: {
    submit: (text: string) => void
    commentList: CommentProps[]
}) => {
    const [text, setText] = useState('')
    const { submit, commentList } = props
    const { userInfo } = useContext(store).state

    const MAX_LEN = 100

    // methods
    const handleInput = (e: any) => {
        setText(e.target.innerText)
    }
    const handleKeyDown = (e: any) => {
        if (e.keyCode !== 8 && text.length >= MAX_LEN) {
            e.preventDefault()
        }
    }
    const handleSubmit = () => {
        submit(text.substr(0, MAX_LEN))
    }

    return (
        <div className="CommentBox">
            <p className="title">文章评论</p>
            {/* 输入框 */}
            <div className="commentBar">
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${userInfo.avatar})`,
                    }}
                ></div>
                <div className="inputWrapper">
                    <div
                        onKeyDown={handleKeyDown}
                        contentEditable
                        spellCheck="false"
                        className="inputBar"
                        data-placeholder={`请在此输入评论内容 ${MAX_LEN} 字以内`}
                        onInput={handleInput}
                    ></div>
                    <div className="btn">
                        <Button
                            onClick={handleSubmit}
                            type="primary"
                            disabled={!text.length || text.length >= MAX_LEN}
                        >
                            评论
                        </Button>
                    </div>
                </div>
            </div>
            {/* 主体 */}
            <CommentList list={convertComment(commentList)}></CommentList>
        </div>
    )
}

export default CommentBox
