import React, { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu } from 'antd'
import { UserProps } from '@/types/user'
import VerticalLine from '@/components/base/VerticalLine'

const Nav = (props: { userInfo: UserProps, isSelf: boolean }) => {
    const [keys, setKeys] = useState('baseInfo')
    const location = useLocation()
    const username = location.pathname.split('/')[2]
    const PREFIX = `/user/${username}`
    const { userInfo, isSelf } = props

    useEffect(() => {
        setKeys(location.pathname.split('/')[3])
    }, [location])

    return (
        <div className="topNav">
            <Menu selectedKeys={[keys]}>
                <Menu.Item key="baseinfo">
                    <NavLink to={`${PREFIX}/baseinfo`}>基本信息</NavLink>
                </Menu.Item>
                <VerticalLine></VerticalLine>
                <Menu.Item key="articles">
                    <NavLink to={`${PREFIX}/articles/post`}>
                        {userInfo.username === username ? '我' : 'TA'}的文章
                    </NavLink>
                </Menu.Item>
                <VerticalLine></VerticalLine>
                {isSelf && (
                    <Menu.Item key="setting">
                        <NavLink to={`${PREFIX}/setting/info`}>设置</NavLink>
                    </Menu.Item>
                )}
            </Menu>
        </div>
    )
}

export default Nav
