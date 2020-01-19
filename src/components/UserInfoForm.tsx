import React from 'react'
import { Form, Input, Radio } from 'antd'
import './userInfoForm.sass'
// import { userProps } from '../types/user'

const UserInfoForm = (props: any) => {
    const { getFieldDecorator } = props.form
    // const [userObj, setUserObj] = useState({} as userProps)

    return (
        <Form>
            {/* 昵称 */}
            <Form.Item>
                {getFieldDecorator('name', {
                    rules: [
                        {
                            required: true,
                            message: '昵称不能为空',
                        },
                    ],
                })(
                    <div className="item">
                        <div className="prefix">昵称</div>
                        <Input></Input>
                    </div>
                )}
            </Form.Item>
            {/* 性别 */}
            <Form.Item>
                {getFieldDecorator('sex')(
                    <div className="item">
                        <div className="prefix">性别</div>
                        <Radio.Group defaultValue='male'>
                            <Radio value='male'>男</Radio>
                            <Radio value='female'>女</Radio>
                        </Radio.Group>
                    </div>
                )}
            </Form.Item>
            {/* 位置 */}
            <Form.Item>
                {getFieldDecorator('location')(
                    <div className="item">
                        <div className="prefix">位置</div>
                        <Input></Input>
                    </div>
                )}
            </Form.Item>
            {/* 生日 */}
            <Form.Item>
                {getFieldDecorator('location')(
                    <div className="item">
                        <div className="prefix">位置</div>
                        <Input></Input>
                    </div>
                )}
            </Form.Item>
            {/* 个人简介 */}
            {/* 个人网站 */}
            {/* 工作经历 */}
            {/* 教育经历 */}
            {/* 专业技能 */}
        </Form>
    )
}

export default Form.create({
    name: 'user_info',
})(UserInfoForm)
