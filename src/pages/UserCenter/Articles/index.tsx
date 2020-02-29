import React from 'react'
import SideMenu from './SideMenu'
import { Switch, Route } from 'react-router-dom'
import My404Component from '@/components/My404Component'
import Post from './Post'

const Articles = () => {
    const PREFIX = `/user/:username/articles/:type`

    return (
        <div className="Articles">
            <SideMenu></SideMenu>
            <div className="main">
                <Switch>
                    {/* 已发布/草稿箱 */}
                    <Route
                        exact
                        path={PREFIX}
                        component={Post}
                    ></Route>
                    {/* 404 */}
                    <Route component={My404Component}></Route>
                </Switch>
            </div>
        </div>
    )
}

export default Articles
