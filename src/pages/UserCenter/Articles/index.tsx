import React, { useContext } from 'react'
import SideMenu from './SideMenu'
import { Switch, Route, useLocation } from 'react-router-dom'
import My404Component from '@/components/base/My404Component'
import Post from './Post'
import { store } from '@/store'

const Articles = () => {
    const globalStore = useContext(store)
    const { userInfo } = globalStore.state
    const location = useLocation()
    // 是否访问自己的个人中心
    const isSelf = location.pathname.indexOf(userInfo.username) > 0
    const PREFIX = `/user/:username/articles/:type`

    return (
        <div className="Articles">
            {isSelf && <SideMenu></SideMenu>}
            <div className="main">
                <Switch>
                    {/* 已发布/草稿箱 */}
                    <Route exact path={PREFIX} component={Post}></Route>
                    {/* 404 */}
                    <Route component={My404Component}></Route>
                </Switch>
            </div>
        </div>
    )
}

export default Articles
