import React, { useState } from 'react'
import { ArticleProps } from '@/types/articles'
import '@/pages/styles/ArticleItem.sass'
import { Card, message, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import { SendOutlined, DeleteOutlined } from '@ant-design/icons'
import { articlePost, articleDel } from '@/api/article'
import {
    LikeOutlined,
    StarOutlined,
    CommentOutlined,
    FileImageOutlined,
} from '@ant-design/icons'
import { formatNumber } from '@/utils/methods'
import UploadAvatarModal from '@/components/modals/UploadAvatarModal'
import { saveArticleHeadPic } from '@/api/article'

const ArticleItem = (props: {
    articleInfo: ArticleProps
    refresh?: () => void
    canEdit: boolean
}) => {
    const { articleInfo, refresh, canEdit } = props
    const history = useHistory()
    const [confirmModalVisible, showConfirmModal] = useState(false)
    const [picModalVisible, setPicModalVisible] = useState(false)

    // methods
    const submit = async (imageUrl: string) => {
        if (!imageUrl) {
            message.warning('请上传图片！')
            return
        }
        try {
            let res = await saveArticleHeadPic({
                url: imageUrl,
                aid: articleInfo.aid,
            })
            if (res.code === 200) {
                if (refresh) refresh()
                setPicModalVisible(false)
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    const handleCardClick = () => {
        if (canEdit) {
            history.push(`/write/${articleInfo.aid}`)
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
    // 显示头图设置 modal

    return (
        <div className={`ArticleItem ${articleInfo.show ? '' : 'forbidden'}`}>
            <Card onClick={handleCardClick}>
                <div className="title">
                    <h1>{articleInfo.title}</h1>
                </div>
                <div className="subTitle">{articleInfo.subTitle}</div>
                <div className="bottom">
                    <span className="like">
                        <LikeOutlined></LikeOutlined>
                        {formatNumber(articleInfo?.likers?.length)}
                    </span>
                    <span className="star">
                        <StarOutlined></StarOutlined>
                        {formatNumber(articleInfo?.collectors?.length)}
                    </span>
                    <span className="comment">
                        <CommentOutlined />
                        {formatNumber(articleInfo?.commentsCount)}
                    </span>
                    <span className="author">{articleInfo.author?.name}</span>
                </div>
                <div
                    className="pic"
                    style={{
                        backgroundImage: `url(${articleInfo.headPic ||
                            require('@/img/scene.jpg')})`,
                    }}
                ></div>
            </Card>
            {articleInfo.show && canEdit && (
                <div className="toolbar">
                    {articleInfo.type === 'draft' && (
                        <SendOutlined className="send" onClick={postArticle} />
                    )}
                    <FileImageOutlined
                        className="u_pic"
                        onClick={() => setPicModalVisible(true)}
                    />
                    <DeleteOutlined
                        className="del"
                        onClick={() => showConfirmModal(true)}
                    />
                </div>
            )}
            {/* 确认删除 Modal */}
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
            {/* 设置头图 Modal */}
            <UploadAvatarModal
                visible={picModalVisible}
                title={'上传文章封面图'}
                submit={submit}
                imageUrl={articleInfo.headPic}
                onCancel={() => setPicModalVisible(false)}
            ></UploadAvatarModal>
        </div>
    )
}

export default ArticleItem
