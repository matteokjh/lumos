import React from 'react'
import { Route, Switch } from 'react-router-dom'
import SideMenu from './SideMenu'
import Info from './Info'
import PwdChange from './PwdChange'
import My404Component from '../../../components/My404Component'
import './setting.sass'

const Setting = () => {
    const PREFIX = `/user/:username/setting`

    return (
        <div className="setting">
            {/* 设置 - 侧边栏 */}
            <SideMenu></SideMenu>
            {/* 设置 - 主体 */}
            <div className="main">
                <Switch>
                    {/* 个人资料 */}
                    <Route
                        exact
                        path={`${PREFIX}/info`}
                        component={Info}
                    ></Route>
                    {/* 密码修改 */}
                    <Route
                        exact
                        path={`${PREFIX}/password`}
                        component={PwdChange}
                    ></Route>
                    {/* 404 */}
                    <Route component={My404Component}></Route>
                </Switch>
            </div>
        </div>
    )
}

export default Setting
