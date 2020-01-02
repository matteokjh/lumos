import React, { useState, useEffect } from 'react'
import Nav from './components/Nav'
import { userProps } from './types/user'
import Navigate from './components/Navigate'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.sass'

const App: React.FC = () => {
    const [userInfo, setUserInfo] = useState({} as userProps)

    // methods
    const getUserInfo = () => {
        setUserInfo({
            username: 'James',
            name: 'James',
            password: '123123',
            avatar: ''
        })
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div className="App">
            <Router>
                {/* 顶部导航栏 */}
                <Nav userInfo={userInfo} />
                {/* 主体 */}
                <Navigate></Navigate>
            </Router>
        </div>
    )
}

export default App
