import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu } from 'antd'
import { userProps } from '../../types/user'
import VerticalLine from '../../components/VerticalLine'
const Nav = (props: {userInfo: userProps}) => {
    return (
        <div className="topNav">
            <Menu defaultSelectedKeys={['baseInfo']}>
                <Menu.Item key="baseInfo">
                    <NavLink to={`/user/${props.userInfo.username}`}>基本信息</NavLink>
                </Menu.Item>
                <VerticalLine></VerticalLine>
                <Menu.Item key="setting">
                    <NavLink to={`/user/${props.userInfo.username}/setting`}>
                        设置
                    </NavLink>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Nav
