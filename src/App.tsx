import React, { useEffect, useContext } from 'react'
import Nav from './components/Nav'
import Navigate from './components/Navigate'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.sass'
import { store } from './store/index'
import { getToken } from './api/user'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import { message } from 'antd'


const App: React.FC = () => {
    const { showLoginModal, showRegisterModal } = useContext(store).state
    const { dispatch } = useContext(store)
    // methods

    useEffect(() => {
        getToken().then(res=>{
            res.data && dispatch({type: 'SET_USER', payload: res.data})
        }).catch(err=>{
            message.error(err)
        })
    },[dispatch])

    return (
        <div className="App">
            <Router>
                {/* 顶部导航栏 */}
                <Nav />
                {/* 主体 */}
                <Navigate></Navigate>
            </Router>
            {
                (showLoginModal && <LoginModal />) ||
                (showRegisterModal && <RegisterModal />)
            }
        </div>
    )
}

export default App
