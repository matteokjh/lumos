import React, { useEffect, useState } from 'react'
import { getArticle } from '@/api/article'
import { ArticleProps } from '@/types/articles'
import { message } from 'antd'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from '@/pages/components/react-markdown-code-block'
import ReactMarkdownLink from '@/pages/components/react-markdown-link'
import { LikeFilled, StarFilled } from '@ant-design/icons'
import '@/pages/styles/markdown.sass'
import '@/pages/styles/ArticleDetail.sass'
import { useHistory } from 'react-router-dom'
import ToolBar from '@/components/ToolBar'

const ArticleDetail = (props: any) => {
    const [articleInfo, setArticleInfo] = useState({} as ArticleProps)
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    // methods
    const jumpUserInfo = () => {
        history.push(`/user/${articleInfo.author.username}/baseinfo`)
    }

    useEffect(() => {
        let { aid } = props.match.params
        setLoading(true)
        ;(async () => {
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
            setLoading(false)
        })()
    }, [props.match.params])

    return (
        <div className="ArticleDetail">
            {/* 主体 */}
            <div className="md-wrapper">
                <div className="title">
                    <h1>{articleInfo.title}</h1>
                    <p>{articleInfo.subTitle}</p>
                    <hr />
                </div>
                <ReactMarkdown
                    source={articleInfo.content}
                    escapeHtml={false}
                    renderers={{ code: CodeBlock, link: ReactMarkdownLink }}
                ></ReactMarkdown>
                <ToolBar></ToolBar>
            </div>
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
                        文章获赞：9999
                    </p>
                    <p>
                        <StarFilled className="star" />
                        文章被收藏：9999
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ArticleDetail
