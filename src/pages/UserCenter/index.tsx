import React, { useContext } from 'react'
import { Layout } from 'antd'
import { store } from '../../store/index'

const UserCenter = () => {
    const globalStore = useContext(store)
    console.log(globalStore)

    return (
        <Layout>
            
        </Layout>
    )
}

export default UserCenter