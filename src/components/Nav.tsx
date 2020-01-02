import React, { useState } from 'react'
import { Menu, Icon, Dropdown } from 'antd'
import './Nav.sass'

const UserMenu = () => {
    return (
        <Menu>
            <Menu.Item key="0">
                <Icon type="user" />
                <p>个人中心</p>
            </Menu.Item>
            <Menu.Item key="1">
                <Icon type="star" />
                <p>收藏列表</p>
            </Menu.Item>
            <Menu.Item key="2">
                <Icon type="form" />
                <p>提交记录</p>
            </Menu.Item>
            <Menu.Item key="3">
                <Icon type="trophy" />
                <p>积分</p>
            </Menu.Item>
            <Menu.Item key="4">
                <Icon type="logout" />
                <p>退出</p>
            </Menu.Item>
            {/* <Menu.Divider /> */}
        </Menu>
    )
}

const Nav = (props: { imageUrl: string; name: string }) => {
    const [current, setCurrent] = useState('main')
    // methods

    return (
        <div className="top-nav">
            <div className="left">
                <div className="logo">𝕷𝖚𝖒𝖔𝖘</div>
                <Menu selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="main">主页</Menu.Item>
                    <Menu.Item key="exercise">题目</Menu.Item>
                </Menu>
            </div>
            <Menu className="right">
                <Menu.Item key="userInfo">
                    <Dropdown className="userDropDown" overlay={UserMenu} trigger={['click']}>
                        <span
                            className="avatar"
                            style={{
                                backgroundImage: `url(${props.imageUrl || require('../img/defaultAvatar.png')})`,
                            }}
                        ></span>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Nav
