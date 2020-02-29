import React, { useContext, useState, useEffect } from 'react'
import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { store } from '../../../store'
import './Articles.sass'

const SideMenu = () => {
    const { userInfo } = useContext(store).state
    const [keys, setKeys] = useState('post')
    const location = useLocation()
    const [isSelf, setIsSelf] = useState(false)

    const PREFIX = `/user/${userInfo.username}/articles`

    useEffect(() => {
        setKeys(location.pathname.split('/')[4])
        setIsSelf(location.pathname.indexOf(userInfo.username) > -1)
    }, [location])

    return (
        <div className="SideMenu">
            <Menu selectedKeys={[keys]} mode="vertical">
                {/* 已发布 */}
                <Menu.Item key="post">
                    <NavLink to={`${PREFIX}/post`}>已发布</NavLink>
                </Menu.Item>
                {/* 草稿箱 */}
                {isSelf && (
                    <Menu.Item key="draft">
                        <NavLink to={`${PREFIX}/draft`}>草稿箱</NavLink>
                    </Menu.Item>
                )}
            </Menu>
        </div>
    )
}

export default SideMenu
