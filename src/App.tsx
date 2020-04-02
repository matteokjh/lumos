import React, { useEffect, useContext, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { message } from 'antd';
import '@/styles/App.sass';
import Loading from '@/components/base/Loading';
import { store } from './store/index';
import { getToken } from './api/user';
import Nav from './components/Nav';
import Navigate from './components/Navigate';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisterModal';

const App: React.FC = () => { 
    const { showLoginModal, showRegisterModal } = useContext(store).state;
    const { dispatch } = useContext(store);
    const [loading, setLoading] = useState(true);

    // methods

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const res = await getToken();
                if (res.data) {
                    dispatch({ type: 'SET_USER', payload: res.data });
                }
            } catch (err) {
                message.error(err);
            }
            setLoading(false);
        })();
    }, [dispatch]);

    return (
        <div className="App">
            {loading ? (
                <Loading />
            ) : (
                <>
                    <Router>
                        {/* 顶部导航栏 */}
                        <Nav />
                        {/* 主体 */}
                        <Navigate />
                    </Router>
                    {(showLoginModal && <LoginModal />) ||
                        (showRegisterModal && <RegisterModal />)}
                </>
            )}
        </div>
    );
};

export default App;
