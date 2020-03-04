import React, { useState, useEffect } from 'react'
import '@/styles/CommentBox.sass'
import { ConvertedCommentProps, CommentProps } from '@/types/comment'
import { formatNumber } from '@/utils/methods'
import { formatTime } from '@/utils/methods'
import {
    LikeOutlined,
    CommentOutlined,
    LikeFilled,
    DeleteOutlined,
} from '@ant-design/icons'
import CommentList from './CommentList'
import CommentBar from './CommentBar'
import { commentLike } from '@/api/comment'
import '@/styles/CommentItem.sass'

import { Link } from 'react-router-dom'
import { message, Popconfirm } from 'antd'
import { UserProps } from '@/types/user'

interface ItemProps {
    submit: (obj: Partial<CommentProps>) => void
    commentInfo: ConvertedCommentProps
    del: (cid: string) => void
    userInfo: UserProps
    refresh: () => void
}

const CommentItem = (props: ItemProps) => {
    const { submit, del, refresh, userInfo } = props
    const [commentInfo, setCommentInfo] = useState({} as ConvertedCommentProps)
    const [inputBoxVisible, setInputBoxVisible] = useState(false)
    const [like, setLikes] = useState(0)

    // methods
    // 点赞/取消点赞
    const handleLike = async () => {
        try {
            let res = await commentLike(commentInfo.cid)
            if (res.code === 200) {
                refresh()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    // 是否显示输入框
    const toggleInputBox = () => {
        setInputBoxVisible(!inputBoxVisible)
    }
    // 删除评论
    const handleDel = () => {
        del(commentInfo.cid)
    }
    // 清除输入框
    const clearInput = () => {
        setInputBoxVisible(false)
    }
    // 当前评论是 obj，当前评论的父评论是 commentInfo
    // 1. 评论文章不走这里
    // 2. 评论父评论：走一次，父评论的 fatherComment 是空的，当前评论的父级要指向父评论
    // 3. 评论子评论：由于组件嵌套的原因，会走两次；第二次没作用，直传上去；
    //    当前评论的父级指向 子评论的父亲；
    const handleSubmit = (obj: Partial<CommentProps>) => {
        if (!obj.to) {
            submit({
                content: obj.content,
                to: commentInfo.userInfo,
                fatherComment: commentInfo.fatherComment || commentInfo,
            })
        } else {
            submit(obj)
        }
    }
    // 收起评论框
    const handleBlur = () => {
        setInputBoxVisible(false)
    }

    useEffect(() => {
        setCommentInfo(props.commentInfo)
        setLikes(props.commentInfo.like.length)
    }, [props.commentInfo])

    return (
        <div className="commentItem">
            <div className="item_top">
                <Link
                    to={`/user/${commentInfo.userInfo?.username}/baseinfo`}
                    target="_blank"
                >
                    <div
                        className="avatar"
                        style={{
                            backgroundImage: `url(${commentInfo.userInfo?.avatar})`,
                        }}
                    ></div>
                </Link>
                <div className="content">
                    <p>{commentInfo.userInfo?.name}</p>
                    <p>
                        {commentInfo.fatherComment &&
                            `回复 ${commentInfo.to.name}：`}
                        {commentInfo.content}
                    </p>
                    {/* 底部栏 */}
                    <div className="bottom-bar">
                        <span className="time">
                            {formatTime(commentInfo.createTime)}
                        </span>
                        <div className="btn-wrapper">
                            <span className="like">
                                {commentInfo.isLiked ? (
                                    <LikeFilled onClick={handleLike} />
                                ) : (
                                    <LikeOutlined onClick={handleLike} />
                                )}
                                <span>{formatNumber(like)}</span>
                            </span>
                            <span
                                onMouseDown={toggleInputBox}
                                className="comment"
                            >
                                <CommentOutlined />
                            </span>
                            {commentInfo.canDel && (
                                <Popconfirm
                                    okText="确定"
                                    cancelText="取消"
                                    onConfirm={handleDel}
                                    title="确认删除该评论？"
                                >
                                    <DeleteOutlined />
                                </Popconfirm>
                            )}
                        </div>
                    </div>
                    {/* 输入框 */}
                    <CommentBar
                        clearInput={clearInput}
                        visible={inputBoxVisible}
                        submit={handleSubmit}
                        onBlur={handleBlur}
                        userInfo={userInfo}
                        MAX_LEN={100}
                        placeholder={`回复 ${commentInfo.userInfo?.name}：`}
                        id={commentInfo.cid}
                    ></CommentBar>
                </div>
            </div>
            {commentInfo.children?.length ? (
                <CommentList
                    userInfo={userInfo}
                    refresh={refresh}
                    submit={handleSubmit}
                    list={commentInfo.children}
                    del={del}
                ></CommentList>
            ) : (
                ''
            )}
        </div>
    )
}

export default CommentItem
