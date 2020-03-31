import React, { useEffect, useState } from 'react'
import ArticleList from './components/ArticleList'
import RightSideBar from './components/RightSideBar'
import './styles/post.sass'
import { getAllArticles } from '@/api/article'
import { message, Skeleton } from 'antd'

// 主页
const Post = () => {
    const [articleList, setArticleList] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                let res = await getAllArticles()
                if (res.code === 200) {
                    setArticleList(res.data)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    return (
        <div className="postLayout">
            {
                loading ? <><ArticleList articleList={articleList} canEdit={false}></ArticleList>
                <RightSideBar></RightSideBar></> : <Skeleton active paragraph={{rows: 20}}></Skeleton>
            }
            
        </div>
    )
}

export default Post
