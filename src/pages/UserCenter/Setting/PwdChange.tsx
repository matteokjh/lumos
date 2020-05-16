import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { changePwd, logout } from '@/api/user';
import '@/pages/styles/PwdChange.sass';
import { useHistory } from 'react-router-dom';

const PwdChange = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    // methods
    const handleClick = async () => {
        try {
            let values = await form.validateFields();
            let originPwd = values['o-pwd'];
            let newPwd = values['n-pwd'];
            let res = await changePwd({ originPwd, newPwd });
            if (res.code === 200) {
                message.success('修改密码成功！请重新登录');
                setTimeout(async () => {
                    let logoutRes = await logout();
                    if (logoutRes.code === 200) {
                        history.push('/');
                        window.location.reload();
                    } else {
                        message.error(res.msg);
                    }
                }, 1000);
            } else {
                message.error(res.msg);
            }
        } catch (err) {}
    };

    return (
        <div className="PwdChange">
            <div className="header">
                <h3>修改密码</h3>
            </div>
            <div className="form-wrapper">
                <Form className="pwd-form" form={form}>
                    <Form.Item
                        label="原密码"
                        name="o-pwd"
                        rules={[
                            {
                                required: true,
                                message: '请输入原密码',
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

export default PwdChange;
