import React, { useEffect, useState } from 'react'
import { getArticle } from '@/api/article'
import { ArticleProps } from '@/types/articles'
import { message, Skeleton } from 'antd'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from '@/pages/components/react-markdown-code-block'
import ReactMarkdownLink from '@/pages/components/react-markdown-link'
import { LikeFilled, StarFilled } from '@ant-design/icons'
import '@/pages/styles/markdown.sass'
import '@/pages/styles/ArticleDetail.sass'
import { useHistory } from 'react-router-dom'
import ToolBar from '@/components/ToolBar'
import { formatDate, formatNumber } from '@/utils/methods'

const ArticleDetail = (props: any) => {
    const [articleInfo, setArticleInfo] = useState({} as ArticleProps)
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    // methods
    const jumpUserInfo = () => {
        history.push(`/user/${articleInfo.author.username}/baseinfo`)
    }

    useEffect(() => {
        setLoading(true)
        ;(async () => {
            // 获取文章详情信息
            try {
                let { aid } = props.match.params
                let res = await getArticle(aid)
                if (res.code === 200) {
                    setArticleInfo(res.data)
                    // console.log(res.data)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
            setLoading(false)
        })()
    }, [props.match.params])

    return (
        <div className="ArticleDetail">
            <Skeleton
                paragraph={{
                    rows: 15,
                }}
                className="ske1"
                active
                loading={loading}
            >
                {/* 主体 */}
                <div className="md-wrapper">
                    <div className="title">
                        <h1>{articleInfo.title}</h1>
                        <p>{articleInfo.subTitle}</p>
                    </div>
                    <div className="author">
                        作者：{articleInfo?.author?.name}
                    </div>
                    <div className="time">
                        <span>
                            发布日期：{formatDate(articleInfo?.createTime)}
                        </span>
                        <span>
                            最后修改日期：
                            {formatDate(articleInfo?.modifiedTime)}
                        </span>
                    </div>
                    <hr />
                    <ReactMarkdown
                        source={articleInfo.content}
                        escapeHtml={false}
                        renderers={{ code: CodeBlock, link: ReactMarkdownLink }}
                    ></ReactMarkdown>
                    <ToolBar articleInfo={articleInfo}></ToolBar>
                </div>
            </Skeleton>
            <Skeleton
                className="ske2"
                paragraph={{
                    rows: 5,
                }}
                active
                avatar
                loading={loading}
            >
                {/* 右边栏 */}
                <div className="authorBox">
                    <p className="title">作者简介</p>
                    <div className="user-wrapper" onClick={jumpUserInfo}>
                        <div>
                            <span
                                className="avatar"
                                style={{
                                    backgroundImage: `url(${articleInfo?.author?.avatar})`,
                                }}
                            ></span>
                            <div>
                                <h2>{articleInfo?.author?.name}</h2>
                                <span>{articleInfo?.author?.work}</span>
                            </div>
                        </div>
                    </div>
                    <p className="intro">
                        「<span>{articleInfo?.author?.introduction}</span>」
                    </p>
                    <div className="counts">
                        <p>
                            <LikeFilled className="like" />
                            文章获赞：
                            {formatNumber(articleInfo?.author?.likesTotal)}
                        </p>
                        <p>
                            <StarFilled className="star" />
                            文章被收藏：
                            {formatNumber(articleInfo?.author?.starsTotal)}
                        </p>
                    </div>
                </div>
            </Skeleton>
        </div>
    )
}

export default ArticleDetail
