import React, { useContext } from 'react'
import { Form, Input, Button, message } from 'antd'
import { store } from '../../store'
import { LoginProps } from './types/login'
import './styles/loginModal.sass'
import { login } from '../../api/user'
import { CloseOutlined, UserOutlined, LockOutlined } from '@ant-design/icons'

const LoginModal = (props: any) => {
    const globalStore = useContext(store)
    const { dispatch } = globalStore

    // methods
    const handleSubmit = () => {
        props.form.validateFields(async (err: Error, values: LoginProps) => {
            if (!err) {
                try {
                    let res = await login(values)
                    if (res.code === 200) {
                        // window.location.reload()
                    } else {
                        message.error(res.msg)
                    }
                } catch (err) {
                    message.error(err)
                }
            }
        })
    }
    const showRegister = () => {
        dispatch({
            type: 'SHOW_REGISTER_MODAL',
            payload: true,
        })
        dispatch({
            type: 'SHOW_LOGIN_MODAL',
            payload: false,
        })
    }

    return (
        <div className="loginModal">
            <Form className="login-form">
                <span
                    className="cross"
                    onClick={() =>
                        dispatch({
                            type: 'SHOW_LOGIN_MODAL',
                            payload: false,
                        })
                    }
                >
                    <CloseOutlined />
                </span>
                <div
                    style={{
                        fontSize: 40,
                        marginBottom: 20,
                    }}
                >
                    𝕷𝖚𝖒𝖔𝖘
                </div>
                {/* 用户名 */}
                <Form.Item
                    style={{
                        marginBottom: 20,
                    }}
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: '用户名不能为空!',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        }
                        placeholder="用户名（邮箱）"
                    />
                </Form.Item>
                {/* 密码 */}
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: '密码不能为空!',
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        }
                        type="password"
                        placeholder="密码"
                    />
                </Form.Item>
                {/* 登录 */}
                <Form.Item>
                    <Button
                        type="primary"
                        className="login-form-button"
                        onClick={handleSubmit}
                    >
                        登录
                    </Button>
                </Form.Item>
                <div
                    style={{
                        display: 'inline-flex',
                        width: '100%',
                        justifyContent: 'space-between',
                    }}
                >
                    <Button className="link">忘记密码</Button>
                    <Button
                        onClick={showRegister}
                        style={{
                            float: 'right',
                        }}
                        className="link"
                    >
                        立即注册
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default LoginModal
