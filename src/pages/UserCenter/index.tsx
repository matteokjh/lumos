import React, { useContext, lazy, Suspense } from 'react';
import { store } from '@/store/index';
import { Route, useLocation, Switch } from 'react-router-dom';
import '@/pages/styles/index.sass';
import Nav from './Nav';
import Loading from '@/components/base/Loading';

const BaseInfo = lazy(() => import('./BaseInfo/index'));
const Articles = lazy(() => import('./Articles'));
const Setting = lazy(() => import('./Setting/index'));
const My404Component = lazy(() => import('@/components/base/My404Component'));

const UserCenter = () => {
    const globalStore = useContext(store);
    const { userInfo } = globalStore.state;
    const location = useLocation();
    // 是否访问自己的个人中心
    const isSelf = location.pathname.indexOf(userInfo.username) > 0;

    return (
        <>
            {/* 导航 */}
            {<Nav isSelf={isSelf} userInfo={userInfo}></Nav>}

            <Suspense fallback={<Loading></Loading>}>
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
            </Suspense>
        </>
    );
};

export default UserCenter;
