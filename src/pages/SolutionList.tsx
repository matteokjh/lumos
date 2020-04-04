import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getList } from '@/api/solution'
import { SolutionProps, JudgeCode } from '@/types/solution'
import { message, Skeleton, Table, Button } from 'antd'
import { LangArr } from '@/types/exercise'
import {
    formatLang,
    formatJudgeResult,
    formatTime,
    formatMemory,
} from '@/utils/methods'
import './styles/SolutionList.sass'

const SolutionList = () => {
    const [isRunning, setIsRunning] = useState(false)
    const [list, setlist] = useState([] as SolutionProps[])
    const history = useHistory()

    // column
    const column = [
        {
            title: '题目',
            dataIndex: 'exerciseInfo',
            key: 'exerciseInfo',
            render: (data: any, row: SolutionProps) => {
                return (
                    <span>
                        {row.exerciseInfo?.id}. {row.exerciseInfo?.title}
                    </span>
                )
            },
        },
        {
            title: '语言',
            dataIndex: 'lang',
            key: 'lang',
            render: (data: typeof LangArr[number]) => {
                return <span>{formatLang(data)[0]}</span>
            },
        },
        {
            title: '提交结果',
            dataIndex: 'judge',
            key: 'judge',
            render: (data: JudgeCode, row: SolutionProps) => {
                const obj = formatJudgeResult(data)
                return (
                    <Link to={`/solution/${row.sid}`}>
                        <span
                            className="solution_judge"
                            style={{
                                color: obj[2],
                                borderColor: obj[2],
                            }}
                        >
                            {obj[1]}
                        </span>
                    </Link>
                )
            },
        },
        {
            title: '执行用时',
            dataIndex: 'time',
            key: 'time',
            render: (data: number) => {
                return data + 'ms'
            },
        },
        {
            title: '内存消耗',
            dataIndex: 'memory',
            key: 'memory',
            render: (data: number) => {
                return formatMemory(data)
            },
        },
        {
            title: '提交时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (data: number) => {
                return formatTime(data)
            },
        },
    ]

    useEffect(() => {
        setIsRunning(true)
        ;(async () => {
            try {
                let res = await getList()
                if (res.code === 200) {
                    setlist(res.data)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
            setIsRunning(false)
        })()
    }, [])

    return (
        <div className="SolutionList">
            {isRunning ? (
                <Skeleton className="so-ske" active paragraph={{
                    rows: 20
                }}></Skeleton>
            ) : (
                <>
                    <div className="top">
                        <h2>提交记录</h2>
                        <Button onClick={() => history.push('/')}>返回</Button>
                    </div>
                    <div className="solutionTable">
                        <Table
                            rowKey="sid"
                            dataSource={list}
                            columns={column}
                        ></Table>
                    </div>
                </>
            )}
        </div>
    )
}

export default SolutionList
