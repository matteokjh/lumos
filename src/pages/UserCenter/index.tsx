import React, { useContext } from 'react'
import { Layout } from 'antd'
import { store } from '../../store/index'

const UserCenter = () => {
    const globalStore = useContext(store)
    const { userInfo } = globalStore.state

    return (
        <Layout>
            <p>Hello {userInfo.name}</p>
        </Layout>
    )
}

export default UserCenter