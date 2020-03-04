import React from 'react'
import CommentItem from './CommentItem'
import { ConvertedCommentProps } from '@/types/comment'
import '@/styles/CommentList.sass'
import { CommentProps } from '@/types/comment'
import { UserProps } from '@/types/user'

interface ListProps {
    submit: (obj: Partial<CommentProps>) => void
    list: ConvertedCommentProps[]
    del: (cid: string) => void
    refresh: () => void
    userInfo: UserProps
}

const CommentList = (props: ListProps) => {
    const { list, submit, del, refresh, userInfo } = props
    return (
        <div className="commentList">
            {list.length
                ? list.map(e => (
                      <CommentItem
                          del={del}
                          refresh={refresh}
                          submit={submit}
                          key={e.cid}
                          commentInfo={e}
                          userInfo={userInfo}
                      ></CommentItem>
                  ))
                : ''}
        </div>
    )
}

export default CommentList
