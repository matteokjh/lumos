import React from 'react'
import { Form, Input } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { CompanyProps } from '@/types/user'

interface ItemProps {
    field?: CompanyProps
    idx: number
    isEdit: boolean
    key: number
    add: () => void
    remove: (key: number) => void
    showAddBtn: boolean
}

const CompanyListItem = (props: ItemProps) => {
    const { idx, isEdit, add, remove, field, showAddBtn } = props

    return (
        <Form.Item key={`company_${idx}`}>
            <div className="company-group">
                {/* 公司名 */}
                <Form.Item name={[`companys`, idx, 'name']}>
                    <Input
                        disabled={!isEdit}
                        spellCheck={false}
                        autoComplete="off"
                        allowClear
                        placeholder={isEdit ? '公司名称' : ''}
                    ></Input>
                </Form.Item>
                {/* title */}
                <Form.Item name={[`companys`, idx, 'title']}>
                    <Input
                        disabled={!isEdit}
                        spellCheck={false}
                        autoComplete="off"
                        allowClear
                        placeholder={isEdit ? '职位' : ''}
                    ></Input>
                </Form.Item>
            </div>
            {/* 删除按钮 */}
            {(isEdit && (
                <MinusCircleOutlined
                    className="minus"
                    onClick={() => remove(idx)}
                />
            )) ||
                ''}
            {/* 最后一个元素放增加按钮 */}
            {(showAddBtn && (
                <PlusCircleOutlined className="add" onClick={() => add()} />
            )) ||
                ''}
        </Form.Item>
    )
}

export default CompanyListItem
