import React from 'react'
import { briefExerciseProps } from '@/types/exercise'
import { Table } from 'antd'
import { Link } from 'react-router-dom'
import '@/pages/styles/ExerciseList.sass'
import { formatMode } from '@/utils/methods'
import { ModeProps } from '@/types/exercise'

interface ListProps {
    exerciseList: briefExerciseProps[]
    loading: boolean
}
const ExerciseList = (props: ListProps) => {
    const { exerciseList, loading } = props

    // columns
    const columns = [
        {
            title: '编号',
            dataIndex: 'id',
        },
        {
            title: '题目',
            dataIndex: 'title',
            render: (data: string, row: briefExerciseProps) => {
                return <Link to={`/exercise/detail/${row.id}`}>{data}</Link>
            },
        },
        {
            title: '难度',
            dataIndex: 'mode',
            render: (data: ModeProps) => {
                const [text, color] = formatMode(data)
                return (
                    <span
                        style={{
                            color,
                        }}
                    >
                        {text}
                    </span>
                )
            },
        },
        {
            title: '通过率',
            render: (row: briefExerciseProps) => {
                return `${
                    row.submitTimes
                        ? Math.round((row.passTimes / row.submitTimes) * 100) /
                          100
                        : 0
                }%`
            },
        },
    ]

    // methods

    return (
        <div className="ExerciseList">
            <Table
                rowClassName={(row, idx) => (idx % 2 ? 'greyrow' : '')}
                rowKey="id"
                loading={loading}
                dataSource={exerciseList}
                columns={columns}
            ></Table>
        </div>
    )
}

export default ExerciseList
