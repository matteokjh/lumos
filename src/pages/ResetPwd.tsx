import React, { useEffect, useState } from 'react';
import { Form, Button, Input, message } from 'antd';
import '@/pages/styles/ResetPwd.sass';
import { verifyToken, resetPwd } from '@/api/resetPwd';
import { useHistory } from 'react-router-dom';

// 忘记密码
const ResetPwd = (props: any) => {
    const [form] = Form.useForm();
    const { token } = props.match.params;
    const history = useHistory();
    const [user, setUser] = useState('');

    // methods
    const handleClick = async () => {
        try {
            let values = await form.validateFields();
            console.log(values);
            let res = await resetPwd({
                newPwd: values['n-pwd'],
                token
            })
            if(res.code === 200) {
                message.success(res.msg)
                history.push("/")
            } else {
                message.error(res.msg)
            }
        } catch (err) {}
    };

    useEffect(() => {
        (async () => {
            try {
                let res = await verifyToken({ token });
                if (res.code === 200) {
                    setUser(res.data.user);
                } else {
                    message.error(res.msg);
                    history.push('/');
                    window.location.reload();
                }
            } catch (err) {
                message.error(err);
            }
        })();
    }, [token]);

    return (
        <div className="ResetPwd">
            <div className="wrapper">
                <h1>重置密码</h1>
                <p>用户名：{user}</p>
                <Form className="r-form" form={form}>
                    <Form.Item
                        label="新密码"
                        name="n-pwd"
                        rules={[
                            {
                                required: true,
                                message: '请输入新密码',
                            },
                        ]}
                    >
                        <Input
                            allowClear
                            autoComplete="off"
                            spellCheck={false}
                            type="password"
                        ></Input>
                    </Form.Item>
                    <Form.Item
                        label="确认新密码"
                        name="c-pwd"
                        rules={[
                            {
                                required: true,
                                message: '请确认新密码',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (
                                        !value ||
                                        getFieldValue('n-pwd') === value
                                    ) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('两个新密码不一致');
                                },
                            }),
                        ]}
                    >
                        <Input
                            allowClear
                            autoComplete="off"
                            spellCheck={false}
                            type="password"
                        ></Input>
                    </Form.Item>
                    <Form.Item className="submit_btn">
                        <Button type="primary" onClick={handleClick}>
                            确认修改
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default ResetPwd;
