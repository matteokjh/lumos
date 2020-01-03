import React, { useContext, useReducer } from 'react'
import { Layout } from 'antd'
import { store } from '../../store/index'

const Header = () => {
    const globalStore = useContext(store)
    const { userInfo } = globalStore.state
    return (
        <Layout>
            <div className="avatar" style={{
                backgroundImage: 'url()'
            }}></div>
        </Layout>
    )
}

export default Header