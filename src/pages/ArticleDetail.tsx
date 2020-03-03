import React, { useEffect, useState, useContext } from 'react'
import { getArticle } from '@/api/article'
import { ArticleProps } from '@/types/articles'
import { message, Skeleton } from 'antd'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from '@/pages/components/react-markdown-code-block'
import ReactMarkdownLink from '@/pages/components/react-markdown-link'
import ReactMarkdownImg from '@/pages/components/react-markdown-img'
import { LikeFilled, StarFilled } from '@ant-design/icons'
import '@/pages/styles/markdown.sass'
import '@/pages/styles/ArticleDetail.sass'
import CommentBox from '@/components/CommentBox'
import { useHistory } from 'react-router-dom'
import ToolBar from '@/components/ToolBar'
import { formatDate, formatNumber } from '@/utils/methods'
import { store } from '@/store'

const ArticleDetail = (props: any) => {
    const [articleInfo, setArticleInfo] = useState({} as ArticleProps)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const { userInfo } = useContext(store).state

    // methods
    const jumpUserInfo = () => {
        if(userInfo.isLogin) { 
            history.push(`/user/${articleInfo.author.username}/baseinfo`)
        } else {
            message.warning('请先登录以访问他人主页')
        }
    }
    const submitComment = (text: string) => {
        console.log(text)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setLoading(true)
        ;(async () => {
            // 获取文章详情信息
            try {
                let aid = props.match.params.aid
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
    }, [props.match.params.aid])

    return (
        <div className="ArticleDetail">
            {/* 文章主体 */}
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
                        renderers={{
                            code: CodeBlock,
                            link: ReactMarkdownLink,
                            image: ReactMarkdownImg,
                        }}
                    ></ReactMarkdown>
                    {/* 评论 */}
                    <CommentBox submit={submitComment}></CommentBox>
                    {/* 左边工具栏 */}
                    <ToolBar articleInfo={articleInfo}></ToolBar>
                </div>
            </Skeleton>
            {/* 右边作者栏 */}
            <Skeleton
                className="ske2"
                paragraph={{
                    rows: 5,
                }}
                active
                avatar
                loading={loading}
            >
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
