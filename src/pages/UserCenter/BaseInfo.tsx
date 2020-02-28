import React, { useContext, useEffect, useState } from 'react'
import { store } from '../../store'
import { getUserInfo } from '../../api/user'
import { message, Button, Tooltip } from 'antd'
import { useLocation, useHistory, NavLink } from 'react-router-dom'
import { UserProps } from '../../types/user'
import MyIcon from '../../components/MyIcon'
import { EditOutlined } from '@ant-design/icons'

const BaseInfo = () => {
    // 自己的个人信息
    const { userInfo } = useContext(store).state
    // 个人信息（可能是别人的）
    const [user, setUser] = useState({} as UserProps)
    // 根据 url 请求个人信息
    const location = useLocation()
    // 跳转
    const history = useHistory()
    // methods
    useEffect(() => {
        ;(async () => {
            try {
                let username = location.pathname.split('/')[2]
                let res = await getUserInfo(username)
                if (res.code === 200) {
                    setUser(res.data.userInfo)
                } else {
                    message.error(res.msg)
                    history.push('/')
                }
            } catch (err) {
                message.error(err)
            }
        })()
    }, [location, history])
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
                    <Tooltip title={user.name}>
                        <h3>{user.name}</h3>
                    </Tooltip>
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
                            {user?.rankId?.rank}
                        </span>
                    </p>
                </div>
            </div>
            {/* main */}
            <div className="main">
                {/* left */}
                <div className="info-detail">
                    {/* 编辑按钮 */}
                    {user.username === userInfo.username && (
                        <div className="edit">
                            <Button type="primary">
                                <NavLink
                                    to={`/user/${userInfo.username}/setting/info`}
                                    style={{
                                        color: '#fff',
                                    }}
                                >
                                    <EditOutlined style={{
                                            marginRight: '5px',
                                        }}/>
                                    <span>编辑个人资料</span>
                                </NavLink>
                            </Button>
                        </div>
                    )}
                    {/* 个人简介 */}
                    <div className="intro">
                        <b>个人简介</b>
                        <p>{userInfo.introduction || '暂无介绍'}</p>
                    </div>
                    <div className="info">
                        <b>个人资料</b>
                        {/* 公司 */}
                        <div className="company">
                            {userInfo.companys?.length ? (
                                userInfo.companys.map((e, idx) => (
                                    <div key={`company_${idx}`}>
                                        {idx === 0 ? (
                                            <MyIcon type="iconcompany-fill" />
                                        ): <MyIcon type="iconcompany-fill" />}
                                        <div className='row-wrapper'>
                                            <Tooltip placement='right' title={`${e.name} | ${e.title}`}>
                                                <p>{e.name}</p><span>|</span><p>{e.title}</p>
                                            </Tooltip>
                                        </div>
                                    </div>
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
                            {userInfo.schools?.length ? (
                                userInfo.schools.map((e, idx) => (
                                    <div key={`schools_${idx}`}>
                                        {idx === 0 ? (
                                            <MyIcon type="icongraduationcap" />
                                        ): <MyIcon type="icongraduationcap" />}
                                        <div className='row-wrapper'>
                                            <Tooltip placement='right' title={`${e.name} | ${e.time}`}>
                                                <p>{e.name}</p><span>|</span><p>{e.time}</p>
                                            </Tooltip>
                                        </div>
                                    </div>
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
                                    <p>保密</p>
                                )}
                        </div>
                        {/* 博客 */}
                        <div className="website">
                            <MyIcon type="iconwww"></MyIcon>
                            {(userInfo.website && (
                                <a
                                    href={
                                        userInfo.website.match(/http:\/\//)
                                            ? userInfo.website
                                            : `http://${userInfo.website}`
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        marginLeft: '10px',
                                    }}
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
