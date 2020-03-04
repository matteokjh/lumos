import React from 'react'
import CommentItem from './CommentItem'
import { ConvertedCommentProps } from '@/types/comment'
import '@/styles/CommentList.sass'

interface ListProps {
    submit: (text: string) => void
    list: ConvertedCommentProps[]
    del: (cid: string) => void
}

const CommentList = (props: ListProps) => {
    const { list, submit, del } = props
    return (
        <div className="commentList">
            {list.length
                ? list.map(e => (
                      <CommentItem del={del} submit={submit} key={e.cid} commentInfo={e}></CommentItem>
                  ))
                : ''}
        </div>
    )
}

export default CommentList
