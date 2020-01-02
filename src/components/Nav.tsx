import React, { useState, useEffect } from 'react'
import { Menu, Icon, Dropdown, Popconfirm } from 'antd'
import { NavLink } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import Logo from './Logo'
import './Nav.sass'
import { userProps } from '../types/user'

// 下拉菜单
const UserMenu = (props: any) => {
    const { location } = useReactRouter()

    // methods
    const logout = () => {}

    return (
        <Menu selectedKeys={[`/${location.pathname.split('/')[1]}`]}>
            <Menu.Item key="/user">
                <NavLink to={`/user/${props.username}`}>
                    <Icon type="user" />
                    <p>个人中心</p>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/collection">
                <NavLink to={`/collection`}>
                    <Icon type="star" />
                    <p>收藏列表</p>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/record">
                <NavLink to={`/record`}>
                    <Icon type="form" />
                    <p>提交记录</p>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/coin">
                <NavLink to={`/coin`}>
                    <Icon type="trophy" />
                    <p>积分</p>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="/logout">
                <Popconfirm
                    className="logout"
                    title="确认要退出？"
                    onConfirm={logout}
                    okText="确定"
                    cancelText="取消"
                >
                    <div>
                        <Icon type="logout" />
                        <p>退出</p>
                    </div>
                </Popconfirm>
            </Menu.Item>
            {/* <Menu.Divider /> */}
        </Menu>
    )
}

const Nav = (props: { userInfo: userProps }) => {
    const { location } = useReactRouter()
    const { userInfo } = props

    // methods

    return (
        <div className="top-nav">
            <div className="left">
                <Logo />
                <Menu selectedKeys={[location.pathname]} mode="horizontal">
                    <Menu.Item key="/">
                        <NavLink to="/">主页</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/exercise">
                        <NavLink to="/exercise">题目</NavLink>
                    </Menu.Item>
                </Menu>
            </div>
            <Menu className="right">
                <Menu.Item className="userItem" key="userInfo">
                    <Dropdown
                        overlay={
                            <UserMenu username={userInfo.username}></UserMenu>
                        }
                        placement="bottomCenter"
                        trigger={['click']}
                    >
                        <span
                            className="avatar"
                            style={{
                                backgroundImage: `url(${userInfo.avatar ||
                                    require('../img/defaultAvatar.png')})`,
                            }}
                        ></span>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Nav
