import React, { useState, useEffect } from 'react'
import '@/styles/ToolBar.sass'
import {
    LikeOutlined,
    DislikeOutlined,
    StarOutlined,
    LikeFilled,
    StarFilled,
    DislikeFilled,
    ArrowLeftOutlined,
} from '@ant-design/icons'
import { formatNumber } from '@/utils/methods'
import { ArticleProps } from '@/types/articles'
import { message } from 'antd'
import {
    articleLike,
    getArticle,
    articleDisLike,
    articleStar,
} from '@/api/article'
import { useHistory } from 'react-router-dom'

const ToolBar = (props: any) => {
    const [articleInfo, setArticleInfo] = useState({} as ArticleProps)
    const history = useHistory()

    // methods
    const refresh = async () => {
        let { aid } = articleInfo
        try {
            let res = await getArticle(aid)
            if (res.code === 200) {
                setArticleInfo(res.data)
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    const handleLike = async () => {
        try {
            let res = await articleLike(articleInfo.aid)
            if (res.code === 200) {
                refresh()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    const handleDislike = async () => {
        try {
            let res = await articleDisLike(articleInfo.aid)
            if (res.code === 200) {
                refresh()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    const handleStar = async () => {
        try {
            let res = await articleStar(articleInfo.aid)
            if (res.code === 200) {
                refresh()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    const goBack = () => {
        history.go(-1)
    }

    useEffect(() => {
        setArticleInfo(props.articleInfo)
    }, [props.articleInfo])

    return (
        <div className="ToolBar">
            <div className="back" onClick={goBack}>
                <ArrowLeftOutlined />
            </div>
            <div className="like">
                {articleInfo.isLike ? (
                    <LikeFilled onClick={handleLike} />
                ) : (
                    <LikeOutlined onClick={handleLike} />
                )}
                <span>{formatNumber(articleInfo?.likers?.length)}</span>
            </div>
            <div className="dislike">
                {articleInfo.isDislike ? (
                    <DislikeFilled onClick={handleDislike} />
                ) : (
                    <DislikeOutlined onClick={handleDislike} />
                )}
            </div>
            <div className="star">
                {articleInfo.isStar ? (
                    <StarFilled onClick={handleStar} />
                ) : (
                    <StarOutlined onClick={handleStar} />
                )}
                <span>{formatNumber(articleInfo?.collectors?.length)}</span>
            </div>
        </div>
    )
}
export default ToolBar
