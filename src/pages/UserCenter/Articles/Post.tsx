import React, { useEffect, useState, useContext } from 'react'
import { getAllArticles } from '@/api/article'
import { message } from 'antd'
import { store } from '@/store'
import { useHistory } from 'react-router-dom'

const Post = (props: any) => {
    const [articlesType, setArticlesType] = useState('post') // post | draft
    const [articlesAuthor, setArticlesAuthor] = useState('') // username
    const { userInfo } = useContext(store).state
    const history = useHistory()

    useEffect(() => {
        let { username, type } = props.match.params
        if(type === 'draft') {
            if(!userInfo.username) return
            if(username !== userInfo.username) {
                console.log(username, userInfo.username)
                history.push('/404')
                return
            }
        }
        setArticlesAuthor(username)
        setArticlesType(type)
        ;(async () => {
            try {
                let res = await getAllArticles({
                    username,
                    type
                })
                if (res.code === 200) {
                    console.log(res.data)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
        })()
    }, [props.match.params, userInfo, history])
    return <div className="Articles_Post">
        234234
    </div>
}

export default Post