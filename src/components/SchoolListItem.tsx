import React from 'react'
import { Form, Input } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { SchoolProps } from '@/types/user'

interface ItemProps {
    field?: SchoolProps
    idx: number
    isEdit: boolean
    key: number
    showAddBtn: boolean
    remove: (key: number) => void
    add: () => void
}

const SchoolListItem = (props: ItemProps) => {
    const { idx, isEdit, remove, field, showAddBtn, add } = props

    return (
        <Form.Item key={`schools_${idx}`}>
            <div className="school-group">
                {/* 学校名 */}
                <Form.Item name={[`schools[${idx}]`, 'name']}>
                    <Input
                        disabled={!isEdit}
                        spellCheck={false}
                        autoComplete="off"
                        allowClear
                        placeholder={isEdit ? '学校名称' : ''}
                    ></Input>
                </Form.Item>
                {/* time */}
                <Form.Item name={[`schools[${idx}]`, 'time']}>
                    <Input
                        disabled={!isEdit}
                        spellCheck={false}
                        autoComplete="off"
                        allowClear
                        placeholder={isEdit ? '时间' : ''}
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
            {/* 新增按钮 */}
            {(showAddBtn && (
                <PlusCircleOutlined className="add" onClick={() => add()} />
            )) ||
                ''}
        </Form.Item>
    )
}

export default SchoolListItem
