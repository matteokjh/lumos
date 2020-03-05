import React from 'react'
import { Menu } from 'antd'
import { NavLink } from 'react-router-dom'

const CollectionNav = (props: any) => {
    const { type } = props


    return (
        <div className="SideMenu">
            <p className="title">我的收藏</p>
            <Menu mode="vertical" selectedKeys={[type]}>
                <Menu.Item key="article">
                    <NavLink to={`/collection/article`}>文章</NavLink>
                </Menu.Item>
                <Menu.Item key="exercise">
                    <NavLink to={`/collection/exercise`}>题目</NavLink>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default CollectionNav
