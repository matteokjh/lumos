import React, { useContext } from 'react'
import { Result, Button } from 'antd'
import { store } from '@/store'
import { useHistory } from 'react-router-dom'

const ConfirmSucceed = () => {
    const { dispatch } = useContext(store)
    const history = useHistory()
    
    const login = () => {
        dispatch({
            type: 'SHOW_LOGIN_MODAL',
            payload: true
        })
    }
    const goIndex = () => {
        history.push('/')
    }

    return (
        <Result
            status="success"
            title="激活成功！"
            style={{
                margin: 10,
                backgroundColor: '#fff',
                height: 'calc(100vh - 70px)',
            }}
            extra={[
                <Button onClick={goIndex} key="index">回到首页</Button>,
                <Button onClick={login} type="primary" key="login">登录</Button>,
            ]}
        />
    )
}

export default ConfirmSucceed
