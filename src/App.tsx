import React, { useState, useEffect, useContext } from 'react'
import Nav from './components/Nav'
import Navigate from './components/Navigate'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.sass'
import { store } from './store/index'
import { getUserInfo } from './api/user'
import LoginModal from './components/modals/LoginModal'


const App: React.FC = () => {
    const { showLoginModal } = useContext(store).state
    // methods

    useEffect(() => {
        getUserInfo().then(res=>{
            console.log(res)
            // dispatch({type: 'SET_USER', payload: user})
        }).catch(err=>{
            throw err
        })
    }, [])

    return (
        <div className="App">
            <Router>
                {/* 顶部导航栏 */}
                <Nav />
                {/* 主体 */}
                <Navigate></Navigate>
            </Router>
            {
                showLoginModal && <LoginModal />
            }
        </div>
    )
}

export default App
