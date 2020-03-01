import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Post from '../pages/Post'
import Exercise from '../pages/Exercise'
import UserCenter from '../pages/UserCenter/index'
import ConfirmSucceed from '../pages/ConfirmSucceed'
import EditArticle from '../pages/EditArticle'
import My404Component from './My404Component'
import ArticleDetail from '@/pages/ArticleDetail'
import { Layout } from 'antd'

const Navigate = () => (
    <Layout
        style={{
            paddingTop: '20px',
            minHeight: 'calc(100vh - 50px)',
            backgroundColor: '#f1f1f1'
        }}
    >
        <Switch>
            <Route exact path="/" component={Post}></Route>
            {/* 题目列表 */}
            <Route exact path="/exercise/:filter" component={Exercise}></Route>
            {/* 个人信息 */}
            <Route path="/user/:username" component={UserCenter}></Route>
            {/* 注册邮箱激活成功 */}
            <Route exact path="/confirm_succeed" component={ConfirmSucceed}></Route>
            {/* 写文章 */}
            <Route exact path="/write" component={EditArticle}></Route>
            <Route exact path="/write/:aid" component={EditArticle}></Route>
            {/* 文章详情 */}
            <Route exact path="/article/:aid" component={ArticleDetail}></Route>
            {/* 404 */}
            <Route component={My404Component}></Route>
        </Switch>
    </Layout>
)

export default Navigate
