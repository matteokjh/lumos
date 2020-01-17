import React, { useContext, useEffect, useState } from 'react'
import { store } from '../../store'
import { getUserInfo } from '../../api/user'
import { message, Button, Icon } from 'antd'
import { useLocation } from 'react-router-dom'
import { userProps } from '../../types/user'
import MyIcon from '../../components/MyIcon'

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
            {/* top */}
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
                    <p>
                        全站排名：
                        <span
                            style={{
                                fontWeight: 'bold',
                                fontSize: 14,
                                color: '#333',
                            }}
                        >
                            {user.rank}
                        </span>
                    </p>
                </div>
            </div>
            {/* main */}
            <div className="main">
                {/* left */}
                <div className="info-detail">
                    {/* 编辑按钮 */}
                    <div className="edit">
                        <Button type="primary">
                            <Icon type="edit" />
                            编辑个人资料
                        </Button>
                    </div>
                    {/* 个人简介 */}
                    <div className="intro">
                        <b>个人简介</b>
                        <p>{userInfo.introduction || '暂无介绍'}</p>
                    </div>
                    <div className="info">
                        <b>个人资料</b>
                        {/* 公司 */}
                        <div className="company">
                            {userInfo.company.length ? (
                                userInfo.company.map((e, idx) => (
                                    <>
                                        {idx === 0 && (
                                            <MyIcon type="iconcompany-fill" />
                                        )}
                                        <p>{e}</p>
                                    </>
                                ))
                            ) : (
                                <div className="no">
                                    <MyIcon type="iconcompany-fill" />
                                    <p>暂无介绍</p>
                                </div>
                            )}
                        </div>
                        {/* 学校 */}
                        <div className="school">
                            {userInfo.school.length ? (
                                userInfo.school.map((e, idx) => (
                                    <>
                                        {idx === 0 && (
                                            <MyIcon type="icongraduationcap" />
                                        )}
                                        <p>{e}</p>
                                    </>
                                ))
                            ) : (
                                <div className="no">
                                    <MyIcon type="icongraduationcap" />
                                    <p>暂无介绍</p>
                                </div>
                            )}
                        </div>
                        {/* 位置 */}
                        <div className="location">
                            <MyIcon type="iconlocation"></MyIcon>
                            {(userInfo.location && (
                                <p>{userInfo.location}</p>
                            )) || <p>未设置</p>}
                        </div>
                        {/* 性别 */}
                        <div className="sex">
                            <MyIcon type="iconico-sex"></MyIcon>
                            {(userInfo.sex === 'male' && <p>男</p>) ||
                                (userInfo.sex === 'female' && <p>女</p>) || (
                                    <p>未设置</p>
                                )}
                        </div>
                        {/* 博客 */}
                        <div className="website">
                            <MyIcon type="iconwww"></MyIcon>
                            {(userInfo.website && (
                                <a
                                    href={userInfo.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {userInfo.website}
                                </a>
                            )) || <p className="no">未设置</p>}
                        </div>
                    </div>
                </div>
                {/* middle */}
                <div className="self-record"></div>
                {/* right */}
                <div className="chart"></div>
            </div>
        </div>
    )
}

export default BaseInfo
