import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import Loading from '@/components/base/Loading'

const Post = lazy(() => import('@/pages/Post'));
const Exercise = lazy(() => import('@/pages/Exercise'));
const UserCenter = lazy(() => import('@/pages/UserCenter/index'));
const ConfirmSucceed = lazy(() => import('@/pages/ConfirmSucceed'));
const EditArticle = lazy(() => import('@/pages/EditArticle'));
const My404Component = lazy(() => import('./base/My404Component'));
const ArticleDetail = lazy(() => import('@/pages/ArticleDetail'));
const CollectionPage = lazy(() => import('@/pages/CollectionPage'));
const ExerciseDetail = lazy(() => import('@/pages/ExerciseDetail'));
const SolutionList = lazy(() => import('@/pages/SolutionList'));
const Solution = lazy(() => import('@/pages/SolutionDetail'));

const Navigate = () => (
    <Layout
        style={{
            minHeight: 'calc(100vh - 50px)',
            backgroundColor: '#f1f1f1',
        }}
    >
        <Suspense fallback={<Loading></Loading>}>
            <Switch>
                <Route exact path="/" component={Post}></Route>
                {/* 题目列表 */}
                <Route
                    exact
                    path="/exercise/:filter"
                    component={Exercise}
                ></Route>
                {/* 题目详情 */}
                <Route
                    path="/exercise/detail/:id"
                    component={ExerciseDetail}
                ></Route>
                {/* 个人信息 */}
                <Route path="/user/:username" component={UserCenter}></Route>
                {/* 提交记录 */}
                <Route exact path="/solution" component={SolutionList}></Route>
                <Route exact path="/solution/:sid" component={Solution}></Route>
                {/* 注册邮箱激活成功 */}
                <Route
                    exact
                    path="/confirm_succeed"
                    component={ConfirmSucceed}
                ></Route>
                {/* 写文章 */}
                <Route exact path="/write" component={EditArticle}></Route>
                <Route exact path="/write/:aid" component={EditArticle}></Route>
                {/* 文章详情 */}
                <Route
                    exact
                    path="/article/:aid"
                    component={ArticleDetail}
                ></Route>
                {/* 收藏 */}
                <Route
                    path="/collection/:type"
                    component={CollectionPage}
                ></Route>
                {/* 404 */}
                <Route component={My404Component}></Route>
            </Switch>
        </Suspense>
    </Layout>
);

export default Navigate;
