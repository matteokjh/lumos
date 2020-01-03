import React, { useState, useEffect, useContext } from 'react'
import Nav from './components/Nav'
import { userProps } from './types/user'
import { contextProps } from './types/index'
import Navigate from './components/Navigate'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.sass'
import { store } from './store/index'

const App: React.FC = () => {
    const { dispatch }: any = useContext(store)
    // methods
    const getUserInfo = () => {
        const user = {
            username: 'James',
            name: 'James.Zhong',
            avatar: ''
        }
        dispatch({type: 'SET_USER', payload: user})
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="App">
            <Router>
                {/* 顶部导航栏 */}
                <Nav />
                {/* 主体 */}
                <Navigate></Navigate>
            </Router>
        </div>
    )
}

export default App
