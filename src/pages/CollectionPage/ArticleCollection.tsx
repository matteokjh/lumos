import React, { useEffect, useState } from 'react'
import ArticleList from '@/pages/components/ArticleList'
import { ArticleProps } from '@/types/articles'
import { message } from 'antd'
import { getStarArticle } from '@/api/article'

const ArticleCollection = () => {
    const [loading, setLoading] = useState(false)
    const [articleList, setArticleList] = useState([] as ArticleProps[])

    useEffect(() => {
        setLoading(true)
        ;(async () => {
            try {
                let res = await getStarArticle()
                if (res.code === 200) {
                    setArticleList(res.data)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <div className="ArticleCollection">
            <ArticleList
                loading={loading}
                articleList={articleList}
                canEdit={false}
            ></ArticleList>
        </div>
    )
}

export default ArticleCollection
