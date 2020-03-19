import React, { useContext } from 'react'
import { Menu } from 'antd'
import { NavLink, useLocation } from 'react-router-dom'
import { store } from '@/store'
import "@/styles/DetailNav.sass"

const DetailNav = () => {

    const location = useLocation()
    const { exerciseInfo } = useContext(store).state
    const PREFIX = `/exercise/detail`

    return (
        <div className="DetailNav">
            <Menu selectedKeys={[location.pathname]} mode="horizontal" className="nav_menu">
                <Menu.Item key={`${PREFIX}/${exerciseInfo.id}`}>
                    <NavLink to={`${PREFIX}/${exerciseInfo.id}`}>题目介绍</NavLink>
                </Menu.Item>
                <Menu.Item key={`${PREFIX}/${exerciseInfo.id}/solution`}>
                    <NavLink to={`${PREFIX}/${exerciseInfo.id}/solution`}>提交记录</NavLink>
                </Menu.Item>
                <Menu.Item key={`${PREFIX}/${exerciseInfo.id}/comment`} disabled>
                    <NavLink to={`${PREFIX}/${exerciseInfo.id}/comment`}>评论</NavLink>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default DetailNav
