import React, { useState, useEffect } from 'react'
import '@/styles/CommentBox.sass'
import { ConvertedCommentProps } from '@/types/comment'
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
import { commentLike, getComment } from '@/api/comment'
import '@/styles/CommentItem.sass'

import { Link } from 'react-router-dom'
import { message, Popconfirm } from 'antd'

interface ItemProps {
    submit: (text: string) => void
    commentInfo: ConvertedCommentProps
    del: (cid: string) => void
}

const CommentItem = (props: ItemProps) => {
    const { submit, del } = props
    const [commentInfo, setCommentInfo] = useState({} as ConvertedCommentProps)
    const [inputBoxVisible, setInputBoxVisible] = useState(false)

    // methods
    // 点赞/取消点赞
    const handleLike = async () => {
        try {
            let res = await commentLike(commentInfo.cid)
            if (res.code === 200) {
                await refresh()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    // 刷新
    const refresh = async () => {
        try {
            let res = await getComment(commentInfo.cid)
            if (res.code === 200) {
                setCommentInfo(res.data)
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

    useEffect(() => {
        setCommentInfo(props.commentInfo)
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
                    <p>{commentInfo.content}</p>
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
                                <span>
                                    {formatNumber(commentInfo.like?.length)}
                                </span>
                            </span>
                            <CommentOutlined
                                onClick={toggleInputBox}
                                className="comment"
                            />
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
                        visible={inputBoxVisible}
                        submit={submit}
                        userInfo={commentInfo.userInfo}
                        MAX_LEN={100}
                        placeholder={`回复 ${commentInfo.userInfo?.name}：`}
                        onBlur={() => setInputBoxVisible(false)}
                        id={commentInfo.cid}
                    ></CommentBar>
                </div>
            </div>
            {commentInfo.children?.length ? (
                <CommentList
                    submit={submit}
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
