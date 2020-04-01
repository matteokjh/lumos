import React, { useEffect, useState, useContext } from 'react'
import { getMyAllArticles } from '@/api/article'
import { message } from 'antd'
import { store } from '@/store'
import { useHistory } from 'react-router-dom'
import ArticleList from '@/pages/components/ArticleList'

const Post = (props: any) => {
    const [articlesType, setArticlesType] = useState('post') // post | draft
    const [articlesAuthor, setArticlesAuthor] = useState('') // username
    const [articleList, setArticleList] = useState([])
    const { userInfo } = useContext(store).state
    const history = useHistory()
    const [loading, setLoading] = useState(false)

    // methods
    const refresh = async () => {
        const type = props.match.params.type
        setLoading(true)
        try {
            let res = await getMyAllArticles({
                username: articlesAuthor,
                type,
            })
            if (res.code === 200) {
                console.log(res.data)
                setArticleList(res.data)
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
        setLoading(false)
    }

    useEffect(() => {
        let { username, type } = props.match.params
        if (type === 'draft') {
            if (!userInfo.username) return
            if (username !== userInfo.username) {
                history.push('/404')
                return
            }
        }
        setArticlesAuthor(username)
        setArticlesType(type)
        setLoading(true)
        ;(async () => {
            try {
                let res = await getMyAllArticles({
                    username,
                    type,
                })
                if (res.code === 200) {
                    console.log(res.data)
                    setArticleList(res.data)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
            setLoading(false)
        })()
    }, [props.match.params, userInfo, history])
    return (
        <div
            className={`Articles_Post ${
                articlesType === 'draft' ? 'draft' : ''
            }`}
        >
            <ArticleList
                loading={loading}
                articleList={articleList}
                refresh={refresh}
                canEdit={props.match.params.username === userInfo.username}
            ></ArticleList>
        </div>
    )
}

export default Post
