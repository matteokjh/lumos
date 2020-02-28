import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Radio, Button, message, DatePicker } from 'antd'
import './userInfoForm.sass'
import { store } from '../store'
import { setSelfInfo } from '../api/user'
import moment from 'moment'
import CompanyList from '@/components/CompanyList'
import SchoolList from '@/components/SchoolList'

const PROP_MAP: any = {
    name: 1,
    sex: 1,
    location: 1,
    birthday: 1,
    introduction: 1,
    website: 1,
    company: 1,
    school: 1,
}

const dateFormat = 'YYYY-MM-DD'

const UserInfoForm = () => {
    const { userInfo } = useContext(store).state
    const { dispatch } = useContext(store)
    // Form 的方法
    const [form] = Form.useForm()

    // 是否处于编辑状态
    const [isEdit, setIsEdit] = useState(false)

    // methods

    // 返回
    const cancel = () => {
        // return to initial value
        let obj = {} as any
        for (let [key, val] of Object.entries(userInfo)) {
            if (PROP_MAP[key]) {
                obj[key] = val
            }
        }
        form.resetFields()
        // 只有生日需要特殊处理
        form.setFieldsValue({
            ...obj,
            birthday: obj['birthday']
                ? moment(obj['birthday'], dateFormat)
                : null,
        })
        // set false
        setIsEdit(false)
    }
    // 提交信息
    const submit = async () => {
        let userObj = {} as any
        try {
            userObj = await form.validateFields()
        } catch (err) {
            return
        }
        try {
            userObj['birthday'] =
                userObj['birthday'] && userObj['birthday'].format(dateFormat)
            try {
                let res = await setSelfInfo(userObj)
                if (res.code === 200) {
                    message.success(res.msg)
                    dispatch({
                        type: 'SET_USER',
                        payload: res.data,
                    })
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
            // set false
            setIsEdit(false)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        let obj = {} as any
        for (let [key, val] of Object.entries(userInfo)) {
            if (PROP_MAP[key]) {
                obj[key] = val
            }
        }
        form.setFieldsValue({
            ...obj,
            birthday: obj['birthday']
                ? moment(obj['birthday'], dateFormat)
                : null,
        })
    }, [userInfo, form])

    return (
        <Form
            form={form}
            className="userInfoSetting"
            initialValues={{
                sex: userInfo?.sex || '',
                schools: userInfo?.schools || [],
                companys: userInfo?.companys || [],
            }}
        >
            {/* 昵称 */}
            <Form.Item
                label="昵称"
                name="name"
                rules={[
                    {
                        required: true,
                        message: '昵称不能为空',
                    },
                ]}
            >
                <Input
                    autoComplete="off"
                    allowClear
                    disabled={!isEdit}
                    spellCheck={false}
                ></Input>
            </Form.Item>
            {/* 性别 */}
            <Form.Item label="性别" name="sex">
                <Radio.Group disabled={!isEdit}>
                    <Radio value="male">男</Radio>
                    <Radio value="female">女</Radio>
                    <Radio value="">保密</Radio>
                </Radio.Group>
            </Form.Item>
            {/* 位置 */}
            <Form.Item label="位置" name="location">
                <Input
                    autoComplete="off"
                    allowClear
                    disabled={!isEdit}
                    spellCheck={false}
                ></Input>
            </Form.Item>
            {/* 生日 */}
            <Form.Item label="生日" name="birthday">
                <DatePicker
                    format={dateFormat}
                    disabled={!isEdit}
                    placeholder="请选择日期"
                ></DatePicker>
            </Form.Item>
            {/* 个人简介 */}
            <Form.Item label="个人简介" name="introduction">
                <Input.TextArea
                    style={{
                        width: '181.6px',
                        resize: isEdit ? 'vertical' : 'none',
                    }}
                    spellCheck={false}
                    disabled={!isEdit}
                ></Input.TextArea>
            </Form.Item>
            {/* 个人网站 */}
            <Form.Item label="个人网站" name="website">
                <Input
                    autoComplete="off"
                    allowClear
                    disabled={!isEdit}
                    spellCheck={false}
                ></Input>
            </Form.Item>
            {/* 工作经历 */}
            <Form.List name="companys">
                {(fields: any, operation: any) => {
                    return (
                        <CompanyList
                            fields={fields}
                            operation={operation}
                            isEdit={isEdit}
                        ></CompanyList>
                    )
                }}
            </Form.List>
            {/* 教育经历 */}
            <Form.List name="schools">
                {(fields: any, operation: any) => {
                    return (
                        <SchoolList
                            fields={fields}
                            operation={operation}
                            isEdit={isEdit}
                        ></SchoolList>
                    )
                }}
            </Form.List>
            {/* 专业技能 */}
            {/* 按钮组 */}
            <Form.Item className="submit_btn">
                {isEdit ? (
                    <>
                        <Button
                            onClick={cancel}
                            style={{
                                marginRight: '15px',
                            }}
                        >
                            取消
                        </Button>
                        <Button type="primary" onClick={submit}>
                            确认修改
                        </Button>
                    </>
                ) : (
                    <Button type="primary" onClick={() => setIsEdit(true)}>
                        编辑
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default UserInfoForm
