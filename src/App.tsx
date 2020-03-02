import React, { useEffect, useContext, useState } from 'react'
import Nav from './components/Nav'
import Navigate from './components/Navigate'
import { BrowserRouter as Router } from 'react-router-dom'
import '@/styles/App.sass'
import { store } from './store/index'
import { getToken } from './api/user'
import LoginModal from './components/modals/LoginModal'
import RegisterModal from './components/modals/RegisterModal'
import { message } from 'antd'
import Loading from '@/components/Loading'

const App: React.FC = () => {
    const { showLoginModal, showRegisterModal } = useContext(store).state
    const { dispatch } = useContext(store)
    const [loading, setLoading] = useState(true)

    // methods

    useEffect(() => {
        setLoading(true)
        ;(async () => {
            try {
                let res = await getToken()
                if (res.data) {
                    dispatch({ type: 'SET_USER', payload: res.data })
                }
            } catch (err) {
                message.error(err)
            }
            setLoading(false)
        })()
    }, [dispatch])

    return (
        <div className="App">
            {loading ? (
                <Loading></Loading>
            ) : (
                <>
                    <Router>
                        {/* 顶部导航栏 */}
                        <Nav />
                        {/* 主体 */}
                        <Navigate></Navigate>
                    </Router>
                    {(showLoginModal && <LoginModal />) ||
                        (showRegisterModal && <RegisterModal />)}
                </>
            )}
        </div>
    )
}

export default App
