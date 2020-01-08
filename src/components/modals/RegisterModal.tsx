import React, { useContext, useState } from 'react'
import { Form, Input, Icon, Button, message } from 'antd'
import { store } from '../../store'
import { LoginProps } from './types/login'
import './styles/registerModal.sass'
import { register, resend } from '../../api/user'

const RegisterModal = (props: any) => {
    const globalStore = useContext(store)
    const { dispatch } = globalStore

    const { getFieldDecorator } = props.form
    const [remainTime, setRemainTime] = useState(60)
    const [timeStart, setTimeStart] = useState(false)

    const TIME = 60

    // methods
    // 提交注册信息
    const handleSubmit = () => {
        props.form.validateFields(async (err: Error, values: LoginProps) => {
            if (!err) {
                try {
                    let res = await register(values)
                    if(res.code === 200) {
                        message.success(res.msg)
                        backToLogin()
                    } else {
                        message.error(res.msg)
                    }
                } catch(error) {
                    throw error
                }
            }
        })
    }
    // 返回
    const backToLogin = () => {
        dispatch({
            type: 'SHOW_LOGIN_MODAL',
            payload: true,
        })
        dispatch({
            type: 'SHOW_REGISTER_MODAL',
            payload: false,
        })
    }
    // 重新发送邮件
    const resendEmail = () => {
        props.form.validateFields(async (err: Error, values: LoginProps) => {
            if (values.username) {
                startTimer()
                try {
                    let res = await resend(values)
                    if(res.code === 200) {
                        message.success(res.msg)
                    } else {
                        message.error(res.msg)
                    }
                } catch(err) {
                    message.error(err)
                }
            }
        })
    }
    // 开始计时
    const startTimer = () => {
        setTimeStart(true)
        let time = TIME
        setRemainTime(time--)
        function count() {
            if (time > 0) {
                setTimeout(() => {
                    setRemainTime(time--)
                    count()
                }, 1000)
            } else {
                setTimeStart(false)
                setRemainTime(TIME)
            }
        }
        count()
    }

    return (
        <div className="loginModal">
            <Form onSubmit={handleSubmit} className="login-form">
                {/* cross */}
                <span
                    className="cross"
                    onClick={() =>
                        dispatch({
                            type: 'SHOW_REGISTER_MODAL',
                            payload: false,
                        })
                    }
                >
                    <Icon type="close"></Icon>
                </span>
                {/* return to login */}
                <span className="return" onClick={backToLogin}>
                    <Icon type="arrow-left" />
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
                >
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: '用户名不能为空!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="user"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            placeholder="用户名（邮箱）"
                        />
                    )}
                </Form.Item>
                {/* 密码 */}
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: '密码不能为空!',
                            },
                        ],
                    })(
                        <Input
                            prefix={
                                <Icon
                                    type="lock"
                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                />
                            }
                            type="password"
                            placeholder="密码"
                        />
                    )}
                </Form.Item>
                {/* 登录 */}
                <Form.Item>
                    <Button
                        type="primary"
                        className="login-form-button"
                        onClick={handleSubmit}
                    >
                        立即注册
                    </Button>
                </Form.Item>
                <div
                    style={{
                        display: 'inline-flex',
                        width: '100%',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Button
                        disabled={timeStart}
                        className={`link ${timeStart && 'disbled-link'}`}
                        onClick={resendEmail}
                    >
                        重新发送激活邮件{timeStart && ` (${remainTime}) s`}
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Form.create({
    name: 'register',
})(RegisterModal)
