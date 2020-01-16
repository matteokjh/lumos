import React, { useContext, useEffect, useState } from 'react'
import { store } from '../../store'
import { getUserInfo } from '../../api/user'
import { message } from 'antd'
import { useLocation } from 'react-router-dom'
import { userProps } from '../../types/user'

const BaseInfo = () => {
    // 自己的个人信息
    const { userInfo } = useContext(store).state
    // 个人信息（可能是别人的）
    const [user, setUser] = useState({} as userProps)
    // 根据 url 请求个人信息
    const location = useLocation()

    // methods
    useEffect(() => {
        ;(async () => {
            try {
                let username = location.pathname.split('/')[2]
                let res = await getUserInfo(username)
                if (res.code === 200) {
                    setUser({
                        ...res.data.userInfo,
                        rank: res.data.rank,
                    })
                    console.log(res.data)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
        })()
    }, [location])
    return (
        <div className="baseInfo">
            <div className="header">
                <div
                    className="avatar"
                    style={{
                        backgroundImage: `url(${userInfo.avatar ||
                            require('../../img/defaultAvatar.png')})`,
                    }}
                ></div>
                <div className="info">
                    <h3>{user.name}</h3>
                    <p>{user.username}</p>
                    <p>全站排名：<span style={{
                        fontWeight: 'bold',
                        fontSize: 14,
                        color: '#333'
                    }}>{user.rank}</span></p>
                </div>
            </div>
        </div>
    )
}

export default BaseInfo
