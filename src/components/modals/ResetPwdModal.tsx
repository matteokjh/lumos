import React, { useContext, useState, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { store } from '@/store';

import './styles/resetModal.sass';
import { confirmUsername } from '@/api/resetPwd';
import { CloseOutlined, MailOutlined } from '@ant-design/icons';

const ResetPwdModal = () => {
    const globalStore = useContext(store);
    const { dispatch } = globalStore;
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    // methods
    const handleSubmit = async () => {
        try {
            setLoading(true);
            const values: any = await form.validateFields();
            const res = await confirmUsername(values);
            if (res.code === 200) {
                message.success(res.msg);
            } else {
                message.error(res.msg);
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        
    }, [])

    return (
        <div className="resetModal">
            <Form form={form} className="reset-form">
                <span
                    className="cross"
                    onClick={() =>
                        dispatch({
                            type: 'SHOW_RESETPWD_MODAL',
                            payload: false,
                        })
                    }
                >
                    <CloseOutlined />
                </span>
                <div
                    style={{
                        fontSize: 40,
                        marginBottom: 50,
                        textAlign: 'center',
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
                            <MailOutlined
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        }
                        placeholder="用户名（邮箱）"
                    />
                </Form.Item>
                <Form.Item className="btn">
                    <Button
                        type="primary"
                        className="reset-pwd-button"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        忘记密码
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ResetPwdModal;
