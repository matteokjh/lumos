import React from 'react'
import { Form, Input } from 'antd'
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons'

interface ItemProps {
    idx: number
    isEdit: boolean
    key: number
    showAddBtn: boolean
    remove: (key: number) => void
    add: () => void
}

const SchoolListItem = (props: ItemProps) => {
    const { idx, isEdit, remove, showAddBtn, add } = props

    return (
        <Form.Item key={`schools_${idx}`}>
            <div className="school-group">
                {/* 学校名 */}
                <Form.Item name={[idx, 'name']}>
                    <Input
                        disabled={!isEdit}
                        spellCheck={false}
                        autoComplete="off"
                        allowClear
                        placeholder={isEdit ? '学校名称' : ''}
                    ></Input>
                </Form.Item>
                {/* time */}
                <Form.Item name={[idx, 'time']}>
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
