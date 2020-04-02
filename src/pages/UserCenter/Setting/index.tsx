import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import SideMenu from './SideMenu';
import '@/pages/styles/setting.sass';
import Loading from '@/components/base/Loading';

const Info = lazy(() => import('./Info'))
const PwdChange = lazy(() => import('./PwdChange'))
const My404Component = lazy(() => import('@/components/base/My404Component'))

const Setting = () => {
    const PREFIX = `/user/:username/setting`;

    return (
        <div className="setting">
            {/* 设置 - 侧边栏 */}
            <SideMenu></SideMenu>
            {/* 设置 - 主体 */}
            <div className="main">
                <Suspense fallback={<Loading></Loading>}>
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
                </Suspense>
            </div>
        </div>
    );
};

export default Setting;
