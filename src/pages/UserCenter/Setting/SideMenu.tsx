import React, { useContext, useState, useEffect } from 'react'
import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { store } from '../../../store'
import './setting.sass'

const SideMenu = () => {

    const { userInfo } = useContext(store).state
    const [keys, setKeys] = useState('info')
    const location = useLocation()

    const PREFIX = `/user/${userInfo.username}/setting`

    useEffect(() => {
        setKeys(location.pathname.split('/')[4])
    }, [location])

    return (
        <div className="SideMenu">
            <Menu selectedKeys={[keys]} mode="vertical">
                {/* 基本信息 */}
                <Menu.Item key="info">
                    <NavLink to={`${PREFIX}/info`}>个人资料</NavLink>
                </Menu.Item>
                {/* 密码修改 */}
                <Menu.Item key="password">
                    <NavLink to={`${PREFIX}/password`}>修改密码</NavLink>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default SideMenu
