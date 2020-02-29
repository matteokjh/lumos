import React, { useEffect } from 'react'
import { getAllArticles } from '@/api/article'
import { message } from 'antd'

const Articles = (props: any) => {
    useEffect(() => {
        let username = props.match.params.username
        ;(async () => {
            try {
                let res = await getAllArticles({
                    username,
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
    }, [props.match.params.username])

    return <div className="Articles"></div>
}

export default Articles
