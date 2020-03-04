import React, { useEffect, useState, useContext } from 'react'
import { LikeFilled, StarFilled } from '@ant-design/icons'
import { message, Skeleton } from 'antd'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from '@/pages/components/react-markdown-code-block'
import ReactMarkdownLink from '@/pages/components/react-markdown-link'
import ReactMarkdownImg from '@/pages/components/react-markdown-img'
import '@/pages/styles/markdown.sass'
import '@/pages/styles/ArticleDetail.sass'
import CommentBox from '@/components/CommentBox'
import { useHistory } from 'react-router-dom'
import ToolBar from '@/components/base/ToolBar'
import { formatDate, formatNumber } from '@/utils/methods'
import { store } from '@/store'
import { CommentProps } from '@/types/comment'
import { ArticleProps } from '@/types/articles'
import { getArticle } from '@/api/article'
import { articleComment, getCommentList, commentDel } from '@/api/comment'

const ArticleDetail = (props: any) => {
    const [articleInfo, setArticleInfo] = useState({} as ArticleProps)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const { userInfo } = useContext(store).state
    const [commentList, setCommentList] = useState([] as CommentProps[])
    // methods
    const jumpUserInfo = () => {
        if (userInfo.isLogin) {
            history.push(`/user/${articleInfo.author.username}/baseinfo`)
        } else {
            message.warning('请先登录以访问他人主页')
        }
    }
    // 评论文章
    const submitComment = async (obj: Partial<CommentProps>) => {
        try {
            let res = await articleComment({
                content: obj.content || '',
                aid: articleInfo.aid,
            })
            if (res.code === 200) {
                await refreshComment()
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }
    // 删除评论
    const delComment = async (cid: string) => {
        try {
            let res = await commentDel(cid)
            if(res.code === 200) {
                await refreshComment()
            } else {
                message.error(res.msg)
            }
        } catch(err) {
            message.error(err)
        }
    }
    // 刷新评论
    const refreshComment = async () => {
        try {
            let r = await getCommentList(articleInfo.aid)
            if(r.code === 200) {
                setCommentList(r.data)
            } else {
                message.error(r.msg)
            }
        } catch(err) {
            message.error(err)
        }
    }
    
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    // init
    useEffect(() => {
        setLoading(true)
        ;(async () => {
            let aid = props.match.params.aid
            // 文章详情
            let p_article = getArticle(aid)
            // 评论
            let p_commentList = getCommentList(aid)
            try {
                let [articleRes, commentRes] = await Promise.all([
                    p_article,
                    p_commentList,
                ])
                if (articleRes.code === 200) {
                    setArticleInfo(articleRes.data)
                } else {
                    message.error(articleRes.msg)
                }
                if (commentRes.code === 200) {
                    setCommentList(commentRes.data)
                } else {
                    message.error(commentRes.msg)
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
                    <CommentBox
                        commentList={commentList}
                        submit={submitComment}
                        del={delComment}
                        articleInfo={articleInfo}
                        refreshComment={refreshComment}
                    ></CommentBox>
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
