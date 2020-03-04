import React from 'react'
import { SchoolProps } from '../../types/user'
import { PlusCircleOutlined } from '@ant-design/icons'
import SchoolListItem from './SchoolListItem'

interface OperationProps {
    add: () => void
    remove: (key: number) => void
}

const SchoolList = (props: {
    fields: SchoolProps[]
    operation: OperationProps
    isEdit: boolean
}) => {
    const { fields, operation, isEdit } = props
    const { add, remove } = operation

    return (
        <div className={`career ${isEdit && 'career-active'}`}>
            <span className="ant-form-item-label">
                <label>教育经历：</label>
            </span>
            <div className="company-wrapper">
                {fields.length
                    ? fields.map((e: SchoolProps, idx: number) => (
                          <SchoolListItem
                              idx={idx}
                              isEdit={isEdit}
                              add={add}
                              remove={remove}
                              key={idx}
                              showAddBtn={
                                  isEdit && idx === fields.length - 1
                              }
                          ></SchoolListItem>
                      ))
                    : isEdit && (
                          <PlusCircleOutlined
                              className="add"
                              onClick={() => add()}
                          />
                      )}
            </div>
        </div>
    )
}

export default SchoolList
