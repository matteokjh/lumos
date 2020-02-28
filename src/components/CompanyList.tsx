import React, { useEffect, useState } from 'react'
import { CompanyProps } from '../types/user'
import { PlusCircleOutlined } from '@ant-design/icons'
import CompanyListItem from './CompanyListItem'

interface OperationProps {
    add: () => void
    remove: (key: number) => void
}

const CompanyList = (props: {
    fields: CompanyProps[]
    operation: OperationProps
    isEdit: boolean
}) => {
    const { fields, operation, isEdit } = props
    const { add, remove } = operation

    const [showAddBtn, setShowAddBtn] = useState(false)

    useEffect(() => {
        setShowAddBtn(isEdit && fields.every(e => e && e.name))
    }, [fields, isEdit])

    return (
        <div className={`career ${isEdit && 'career-active'}`}>
            <span className="ant-form-item-label">
                <label>工作经历：</label>
            </span>
            <div className="company-wrapper">
                {fields.length
                    ? fields.map((e: CompanyProps, idx: number) => (
                          <CompanyListItem
                              field={e}
                              idx={idx}
                              isEdit={isEdit}
                              key={idx}
                              add={add}
                              remove={remove}
                              showAddBtn={
                                  idx === fields.length - 1 && showAddBtn
                              }
                          ></CompanyListItem>
                      ))
                    : showAddBtn && (
                          <PlusCircleOutlined
                              className="add"
                              onClick={() => add()}
                          />
                      )}
            </div>
        </div>
    )
}

export default CompanyList
