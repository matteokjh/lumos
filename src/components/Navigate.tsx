import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Post from '../pages/Post'
import Exercise from '../pages/Exercise'
import UserCenter from '../pages/UserCenter/index'
import ConfirmSucceed from '../pages/ConfirmSucceed'
import My404Component from './My404Component'
import { Layout } from 'antd'

const Navigate = () => (
    <Layout
        style={{
            marginTop: '20px',
            minHeight: 'calc(100vh - 68px)'
        }}
    >
        <Switch>
            <Route exact path="/" component={Post}></Route>
            <Route path="/exercise" component={Exercise}></Route>
            <Route path="/user/:username" component={UserCenter}></Route>
            <Route path="/confirm_succeed" component={ConfirmSucceed}></Route>
            <Route component={My404Component}></Route>
        </Switch>
    </Layout>
)

export default Navigate
