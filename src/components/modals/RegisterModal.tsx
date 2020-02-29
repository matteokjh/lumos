import React, { useContext, useState, useEffect } from 'react'
import { Form, Input, Button, message } from 'antd'
import { store } from '../../store'
import './styles/registerModal.sass'
import { register, resend } from '../../api/user'
import {
    CloseOutlined,
    ArrowLeftOutlined,
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons'

const RegisterModal = (props: any) => {
    const globalStore = useContext(store)
    const { dispatch } = globalStore

    const TIME = 60

    const [remainTime, setRemainTime] = useState(
        localStorage['remainTime'] || TIME
    )
    const [timeStart, setTimeStart] = useState(
        localStorage['timeStart'] === 'true'
    )

    const [form] = Form.useForm()

    // methods

    // 提交注册信息
    const handleSubmit = async () => {
        let values: any = {}
        try {
            values = await form.validateFields()
        } catch (err) {
            return
        }
        try {
            let res = await register(values)
            if (res.code === 200) {
                message.success(res.msg)
                backToLogin()
            } else {
                message.error(res.msg)
            }
        } catch (error) {
            throw error
        }
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
    const resendEmail = async () => {
        let values: any = {}
        try {
            values = await form.validateFields()
        } catch (err) {
            return
        }
        try {
            startTimer()
            try {
                let res = await resend(values)
                if (res.code === 200) {
                    message.success(res.msg)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
        } catch (err) {
            message.error(err)
        }
    }
    // 开始计时
    const startTimer = () => {
        setTimeStart(true)
        let time = remainTime
        setRemainTime(time--)
        count(time)
    }
    // 计时器
    const count = (time: number) => {
        if (time > 0) {
            window.timer = setTimeout(() => {
                setRemainTime(time--)
                count(time)
            }, 1000)
        } else {
            setTimeStart(false)
            setRemainTime(TIME)
        }
    }

    useEffect(() => {
        function count2() {
            if (remainTime > 0) {
                window.timer = setTimeout(() => {
                    setRemainTime(remainTime - 1)
                    count2()
                }, 1000)
            } else {
                setTimeStart(false)
                setRemainTime(TIME)
            }
        }
        timeStart && count2()
        return () => {
            localStorage['timeStart'] = timeStart
            localStorage['remainTime'] = remainTime

            window.timer && clearTimeout(window.timer)
            window.timer = null
        }
    }, [timeStart, remainTime])

    return (
        <div className="loginModal">
            <Form form={form} className="login-form">
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
                    <CloseOutlined />
                </span>
                {/* return to login */}
                <span className="return" onClick={backToLogin}>
                    <ArrowLeftOutlined />
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

export default RegisterModal
