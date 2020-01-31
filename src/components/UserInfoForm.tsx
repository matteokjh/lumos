import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Radio, Button, message, DatePicker, Icon } from 'antd'
import './userInfoForm.sass'
import { UserProps, CompanyProps } from '../types/user'
import { store } from '../store'
import { setSelfInfo } from '../api/user'
import moment from 'moment'

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

const UserInfoForm = (props: any) => {
    const { userInfo } = useContext(store).state
    const { dispatch } = useContext(store)
    const { getFieldDecorator, setFieldsValue } = props.form
    // const [userObj, setUserObj] = useState({} as UserProps)
    const [companys, setCompanys] = useState([
        {
            name: '',
            title: '',
        },
    ] as CompanyProps[])

    // 是否处于编辑状态
    const [isEdit, setIsEdit] = useState(false)

    // methods
    const addCompany = () => {
        setCompanys(companys.concat({ name: '', title: '' }))
    }
    const removeCompany = () => {
        console.log(companys)
    }
    const cancel = () => {
        // return to initial value
        let obj = {} as any
        for (let [key, val] of Object.entries(userInfo)) {
            if (PROP_MAP[key]) {
                obj[key] = val
            }
        }
        props.form.resetFields()
        // 只有生日需要特殊处理
        setFieldsValue({
            ...obj,
            birthday: obj['birthday']
                ? moment(obj['birthday'], dateFormat)
                : null,
        })
        // set false
        setIsEdit(false)
    }
    const submit = () => {
        props.form.validateFields(async (err: Error, userObj: UserProps) => {
            if (err) return
            userObj['birthday'] =
                userObj['birthday'] && userObj['birthday'].format(dateFormat)
            try {
                console.log(userObj)
                return
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
        })
    }

    useEffect(() => {
        let obj = {} as any
        for (let [key, val] of Object.entries(userInfo)) {
            if (PROP_MAP[key]) {
                obj[key] = val
            }
        }
        setFieldsValue({
            ...obj,
            birthday: obj['birthday']
                ? moment(obj['birthday'], dateFormat)
                : null,
        })
    }, [userInfo, setFieldsValue])

    // component

    // 公司 Item
    const CompanyGroup = companys.length
        ? companys.map((e, idx) => (
              <div className="company-group" key={idx}>
                  {/* 公司名 */}
                  <Form.Item>
                      {getFieldDecorator(`companys[${idx}].name`, {
                          initialValue: e?.name || '',
                      })(
                          <Input
                              disabled={!isEdit}
                              spellCheck={false}
                              autoComplete="off"
                              placeholder={isEdit ? '公司名称' : ''}
                          ></Input>
                      )}
                  </Form.Item>
                  {/* title */}
                  <Form.Item>
                      {getFieldDecorator(`companys[${idx}].title`, {
                          initialValue: e?.title || '',
                      })(
                          <Input
                              disabled={!isEdit}
                              spellCheck={false}
                              autoComplete="off"
                              placeholder={isEdit ? '职位' : ''}
                          ></Input>
                      )}
                  </Form.Item>
                  {/* 删除按钮 */}
                  {companys.length > 1 && (
                      <Icon
                          type="minus-circle"
                          className="minus"
                          onClick={removeCompany}
                      />
                  )}
              </div>
          ))
        : ''

    return (
        <Form className="userInfoSetting">
            {/* 昵称 */}
            <Form.Item label="昵称">
                {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true,
                            message: '昵称不能为空',
                        },
                    ],
                })(<Input disabled={!isEdit} spellCheck={false}></Input>)}
            </Form.Item>
            {/* 性别 */}
            <Form.Item label="性别">
                {getFieldDecorator('sex')(
                    <Radio.Group disabled={!isEdit}>
                        <Radio value="male">男</Radio>
                        <Radio value="female">女</Radio>
                        <Radio value="">保密</Radio>
                    </Radio.Group>
                )}
            </Form.Item>
            {/* 位置 */}
            <Form.Item label="位置">
                {getFieldDecorator('location')(
                    <Input disabled={!isEdit} spellCheck={false}></Input>
                )}
            </Form.Item>
            {/* 生日 */}
            <Form.Item label="生日">
                {getFieldDecorator('birthday')(
                    <DatePicker
                        format={dateFormat}
                        disabled={!isEdit}
                        placeholder="请选择日期"
                    ></DatePicker>
                )}
            </Form.Item>
            {/* 个人简介 */}
            <Form.Item label="个人简介">
                {getFieldDecorator('introduction')(
                    <Input.TextArea
                        style={{
                            width: '181.6px',
                        }}
                        spellCheck={false}
                        disabled={!isEdit}
                    ></Input.TextArea>
                )}
            </Form.Item>
            {/* 个人网站 */}
            <Form.Item label="个人网站">
                {getFieldDecorator('website')(
                    <Input disabled={!isEdit} spellCheck={false}></Input>
                )}
            </Form.Item>
            {/* 工作经历 */}
            <Form.Item className={`career ${isEdit && 'career-active'}`}>
                <div style={{
                    display: 'inline-flex'
                }}>
                    <span className="ant-col ant-form-item-label">
                        工作经历：
                    </span>
                    <div className="company-wrapper">{CompanyGroup}</div>
                </div>
                {/* 添加按钮 */}
                <div className="add-btn">
                    <div onClick={addCompany}>
                        <Icon type="plus-circle" />
                        <span>添加</span>
                    </div>
                </div>
            </Form.Item>
            {/* 教育经历 */}

            {/* 专业技能 */}
            {/* 按钮组 */}
            <Form.Item
                style={{
                    justifyContent: 'center',
                }}
            >
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

export default Form.create({
    name: 'user_info',
})(UserInfoForm)
