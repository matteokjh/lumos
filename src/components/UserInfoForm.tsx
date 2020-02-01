import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Radio, Button, message, DatePicker, Icon } from 'antd'
import './userInfoForm.sass'
import { UserProps, CompanyProps, SchoolProps } from '../types/user'
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
    const { getFieldDecorator, setFieldsValue, getFieldValue } = props.form
    // const [userObj, setUserObj] = useState({} as UserProps)
    const [companys, setCompanys] = useState([
        {
            name: '',
            title: '',
        },
    ] as CompanyProps[])
    const [schools, setSchools] = useState([
        {
            name: '',
            time: '',
        },
    ] as SchoolProps[])

    // 是否处于编辑状态
    const [isEdit, setIsEdit] = useState(false)

    // methods

    // 是否显示添加行按钮
    const showAddRowBtn = (key: 'companys' | 'schools') => {
        let c: (CompanyProps | SchoolProps)[] = getFieldValue(key)
        return isEdit && c.length < 5 && c.every(e => e.name)
    }
    // 添加行
    const add = (key: keyof UserProps) => {
        switch (key) {
            case 'companys':
                setCompanys(companys.concat({ name: '', title: '' }))
                break
            case 'schools':
                setSchools(schools.concat({ name: '', time: '' }))
        }
    }
    // 删除行
    const remove = (key: keyof UserProps, idx: number) => {
        props.form.validateFields(async (err: Error, values: UserProps) => {
            if (!err) {
                let c = values[key]
                let newC = c.slice(0, idx).concat(c.slice(idx + 1))
                switch (key) {
                    case 'companys':
                        setCompanys(newC)
                        break
                    case 'schools':
                        setSchools(newC)
                }
                setFieldsValue({
                    [key]: newC,
                })
            }
        })
    }
    // 返回
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
    // 提交信息
    const submit = () => {
        props.form.validateFields(async (err: Error, userObj: UserProps) => {
            if (err) return
            userObj['birthday'] =
                userObj['birthday'] && userObj['birthday'].format(dateFormat)
            try {
                let res = await setSelfInfo(userObj)
                if (res.code === 200) {
                    message.success(res.msg)
                    dispatch({
                        type: 'SET_USER',
                        payload: res.data
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
        setCompanys(userInfo.companys)
        setSchools(userInfo.schools)
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
              <div className="company-group" key={`company_${idx}`}>
                  {/* 公司名 */}
                  <Form.Item>
                      {getFieldDecorator(`companys[${idx}].name`, {
                          initialValue: e?.name || '',
                      })(
                          <Input
                              disabled={!isEdit}
                              spellCheck={false}
                              autoComplete="off"
                              allowClear
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
                              allowClear
                              placeholder={isEdit ? '职位' : ''}
                          ></Input>
                      )}
                  </Form.Item>
                  {/* 删除按钮 */}
                  {companys.length > 1 && isEdit && (
                      <Icon
                          type="minus-circle"
                          className="minus"
                          onClick={() => remove('companys', idx)}
                      />
                  )}
              </div>
          ))
        : ''

    const SchoolGroup = schools.length
        ? schools.map((e, idx) => (
              <div className="company-group" key={`schools_${idx}`}>
                  {/* 学校名 */}
                  <Form.Item>
                      {getFieldDecorator(`schools[${idx}].name`, {
                          initialValue: e?.name || '',
                      })(
                          <Input
                              disabled={!isEdit}
                              spellCheck={false}
                              autoComplete="off"
                              allowClear
                              placeholder={isEdit ? '学校名称' : ''}
                          ></Input>
                      )}
                  </Form.Item>
                  {/* time */}
                  <Form.Item>
                      {getFieldDecorator(`schools[${idx}].time`, {
                          initialValue: e?.time || '',
                      })(
                          <Input
                              disabled={!isEdit}
                              spellCheck={false}
                              autoComplete="off"
                              allowClear
                              placeholder={isEdit ? '时间' : ''}
                          ></Input>
                      )}
                  </Form.Item>
                  {/* 删除按钮 */}
                  {schools.length > 1 && isEdit && (
                      <Icon
                          type="minus-circle"
                          className="minus"
                          onClick={() => remove('schools', idx)}
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
                })(<Input autoComplete="off" allowClear disabled={!isEdit} spellCheck={false}></Input>)}
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
                    <Input autoComplete="off" allowClear disabled={!isEdit} spellCheck={false}></Input>
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
                            resize: isEdit ? 'vertical' : 'none'
                        }}
                        spellCheck={false}
                        disabled={!isEdit}
                    ></Input.TextArea>
                )}
            </Form.Item>
            {/* 个人网站 */}
            <Form.Item label="个人网站">
                {getFieldDecorator('website')(
                    <Input autoComplete="off" allowClear disabled={!isEdit} spellCheck={false}></Input>
                )}
            </Form.Item>
            {/* 工作经历 */}
            <Form.Item className={`career ${isEdit && 'career-active'}`}>
                <div
                    style={{
                        display: 'inline-flex',
                    }}
                >
                    <span className="ant-col ant-form-item-label">
                        工作经历：
                    </span>
                    <div className="company-wrapper">{CompanyGroup}</div>
                </div>
                {/* 添加按钮 */}
                {showAddRowBtn('companys') && (
                    <div className="add-btn">
                        <div onClick={() => add('companys')}>
                            <Icon type="plus-circle" />
                            <span>添加</span>
                        </div>
                    </div>
                )}
            </Form.Item>
            {/* 教育经历 */}
            <Form.Item className={`career ${isEdit && 'career-active'}`}>
                <div
                    style={{
                        display: 'inline-flex',
                    }}
                >
                    <span className="ant-col ant-form-item-label">
                        教育经历：
                    </span>
                    <div className="company-wrapper">{SchoolGroup}</div>
                </div>
                {/* 添加按钮 */}
                {showAddRowBtn('schools') && (
                    <div className="add-btn">
                        <div onClick={() => add('schools')}>
                            <Icon type="plus-circle" />
                            <span>添加</span>
                        </div>
                    </div>
                )}
            </Form.Item>
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
