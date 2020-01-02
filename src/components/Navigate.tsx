import React from 'react'
import { Route } from 'react-router-dom'
import Post from '../pages/Post'
import Exercise from '../pages/Exercise'
import UserCenter from '../pages/UserCenter'
import { Layout } from 'antd'

const Navigate = () => (
    <Layout style={{
        marginTop: '20px',
        minHeight: 'calc(100vh - 68px)'
    }}>
        <Route exact path="/" component={Post}></Route>
        <Route path="/exercise" component={Exercise}></Route>
        <Route path="/user/:username" component={UserCenter}></Route>
    </Layout>
)

export default Navigate
