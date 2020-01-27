import React, { useContext, useRef } from 'react'
import { Menu, Icon, Dropdown, Popconfirm, message } from 'antd'
import { NavLink, useHistory } from 'react-router-dom'
import useReactRouter from 'use-react-router'
import Logo from './Logo'
import './Nav.sass'
import { store } from '../store/index'
import { logout } from '../api/user'

// 下拉菜单
const UserMenu = (props: any) => {
    const { location } = useReactRouter()

    // methods
    const handleLogout = props.handleLogout

    return (
        <Menu selectedKeys={[`/${location.pathname.split('/')[1]}`]}>
            <Menu.Item key="/user">
                <NavLink to={`/user/${props.username}/baseinfo`}>
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
                    onConfirm={handleLogout}
                    okText="确定"
                    cancelText="取消"
                >
                    <div onClick={e => e.stopPropagation()}>
                        <Icon type="logout" />
                        <p>退出</p>
                    </div>
                </Popconfirm>
            </Menu.Item>
            {/* <Menu.Divider /> */}
        </Menu>
    )
}

const Nav = () => {
    const { location } = useReactRouter()
    const globalStore = useContext(store)
    const { userInfo } = globalStore.state
    const { dispatch } = globalStore
    const history = useHistory()
    const dropdownRef = useRef(null)

    // methods

    const handleLogout = async () => {
        try {
            let res = await logout()
            if (res.code === 200) {
                history.push('/')
                window.location.reload() // 临时解决菜单收不起来的问题
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }

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
                            <UserMenu
                                handleLogout={handleLogout}
                                username={userInfo.username}
                            ></UserMenu>
                        }
                        placement="bottomCenter"
                        trigger={['click']}
                        disabled={!userInfo.isLogin}
                        ref={dropdownRef}
                    >
                        <div
                            className="avatar"
                            style={{
                                backgroundImage:
                                    userInfo.avatar &&
                                    `url(${userInfo.avatar})`
                            }}
                            onClick={() => {
                                !userInfo.isLogin &&
                                    dispatch({
                                        type: 'SHOW_LOGIN_MODAL',
                                        payload: true,
                                    })
                            }}
                        ></div>
                    </Dropdown>
                </Menu.Item>
            </Menu>
        </div>
    )
}

export default Nav
