import React, { useState } from 'react'
import { ArticleProps } from '@/types/articles'
import '@/pages/styles/ArticleItem.sass'
import { Card, message, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import { SendOutlined, DeleteOutlined } from '@ant-design/icons'
import { articlePost, articleDel } from '@/api/article'

const ArticleItem = (props: {
    articleInfo: ArticleProps
    loading: boolean
    refresh?: () => void
    canEdit: boolean
}) => {
    const { articleInfo, loading, refresh, canEdit } = props
    const history = useHistory()
    const [confirmModalVisible, showConfirmModal] = useState(false)

    // methods
    const formatDate = (time: number) => {
        return new Date(time).toLocaleDateString()
    }
    const handleCardClick = () => {
        if (canEdit) {
            if (articleInfo.show) {
                history.push(`/write/${articleInfo.aid}`)
            }
        } else {
            history.push(`/article/${articleInfo.aid}`)
        }
    }
    // 从草稿箱发布文章
    const postArticle = async () => {
        try {
            let res = await articlePost(articleInfo.aid)
            if (res.code === 200) {
                message.success(res.msg)
                if (refresh) refresh()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    // 用户删除自己的文章
    const delArticle = async () => {
        try {
            let res = await articleDel(articleInfo.aid)
            if (res.code === 200) {
                message.success(res.msg)
                if (refresh) refresh()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    return (
        <div className={`ArticleItem ${articleInfo.show ? '' : 'forbidden'}`}>
            <Card onClick={handleCardClick} loading={loading}>
                <div className="title">
                    <h1>{articleInfo.title}</h1>
                </div>
                <div className="subTitle">{articleInfo.subTitle}</div>
                <div className="author">作者：{articleInfo.author.name}</div>
                <div className="time">
                    <span>发布日期：{formatDate(articleInfo.createTime)}</span>
                    <span>
                        最后修改日期：{formatDate(articleInfo.modifiedTime)}
                    </span>
                </div>
            </Card>
            {articleInfo.show && canEdit && (
                <div className="toolbar">
                    {articleInfo.type === 'draft' && (
                        <SendOutlined className="send" onClick={postArticle} />
                    )}
                    <DeleteOutlined
                        className="del"
                        onClick={() => showConfirmModal(true)}
                    />
                </div>
            )}
            <Modal
                visible={confirmModalVisible}
                title="注意"
                okText="确定"
                cancelText="取消"
                onOk={delArticle}
                onCancel={() => showConfirmModal(false)}
            >
                <p>确定要删除该文章？</p>
            </Modal>
        </div>
    )
}

export default ArticleItem
