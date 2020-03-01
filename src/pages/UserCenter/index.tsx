import React, { useContext } from 'react'
import { store } from '@/store/index'
import { Route, useLocation, Switch } from 'react-router-dom'
import '@/pages/styles/index.sass'
import BaseInfo from './BaseInfo'
import Articles from './Articles'
import Setting from './Setting/index'
import Nav from './Nav'
import My404Component from '@/components/My404Component'

const UserCenter = () => {
    const globalStore = useContext(store)
    const { userInfo } = globalStore.state
    const location = useLocation()
    // 是否访问自己的个人中心
    const isSelf = location.pathname.indexOf(userInfo.username) > 0

    return (
        <>
            {/* 导航 */}
            {isSelf && <Nav userInfo={userInfo}></Nav>}
            
            <Switch>
                {/* 基本信息 */}
                <Route
                    exact
                    path="/user/:username/baseinfo"
                    component={BaseInfo}
                ></Route>
                {/* 文章 */}
                <Route
                    path="/user/:username/articles/:type"
                    component={Articles}
                ></Route>
                {/* 设置 */}
                {isSelf && (
                    <Route
                        path="/user/:username/setting"
                        component={Setting}
                    ></Route>
                )}
                <Route component={My404Component}></Route>
            </Switch>
        </>
    )
}

export default UserCenter
