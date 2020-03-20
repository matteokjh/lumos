import React, { useEffect, useState } from 'react'
import { Button, message, Input } from 'antd'
import { useHistory } from 'react-router-dom'
import { SolutionProps } from '@/types/solution'
import { getSolution } from '@/api/solution'
import '@/styles/SolutionDetail.sass'
import {
    formatJudgeResult,
    formatTime,
    formatLang,
    formatMemory,
} from '@/utils/methods'

const SolutionDetail = (props: any) => {
    const history = useHistory()
    const [solutionInfo, setsolutionInfo] = useState({} as SolutionProps)

    // methods
    const goBack = () => {
        history.go(-1)
    }
    const refresh = async () => {
        try {
            let sid = props.match.params.sid
            let res = await getSolution(sid)
            if (res.code === 200) {
                console.log(res.data)
                setsolutionInfo(res.data)
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
    }

    useEffect(() => {
        refresh()
        // eslint-disable-next-line
    }, [])

    return (
        <div className="SolutionDetail">
            <div className="toolbar">
                <Button onClick={goBack}>返回</Button>
                <Button onClick={refresh}>刷新</Button>
            </div>
            <div className="main">
                <div className="title">
                    <h1>
                        {solutionInfo.exerciseInfo?.id}.{' '}
                        {solutionInfo.exerciseInfo?.title}
                    </h1>
                </div>
                {/* 基本信息 */}
                <div className="sd_box">
                    <p>
                        <b>
                            通过的测试用例：{solutionInfo.passTotal} /{' '}
                            {solutionInfo.testdataTotal}
                        </b>
                    </p>
                    <p>
                        <b>执行用时：{solutionInfo.time} ms</b>
                        {solutionInfo.opType !== 'testRun' && (
                            <span>
                                ，在所有{' '}
                                <b>{formatLang(solutionInfo.lang)[0]}</b>{' '}
                                的提交中超越了 <b>{solutionInfo.timePercent}</b>{' '}
                                的用户
                            </span>
                        )}
                    </p>
                    <p>
                        <b>内存消耗：{formatMemory(solutionInfo.memory)}</b>

                        {solutionInfo.opType !== 'testRun' && (
                            <span>
                                ，在所有{' '}
                                <b>{formatLang(solutionInfo.lang)[0]}</b>{' '}
                                的提交中超越了{' '}
                                <b>{solutionInfo.memoryPercent}</b> 的用户
                            </span>
                        )}
                    </p>
                    <p>
                        状态：
                        <span
                            style={{
                                color: formatJudgeResult(solutionInfo.judge)[2],
                            }}
                        >
                            {formatJudgeResult(solutionInfo.judge)[1]}
                        </span>
                    </p>
                    <p>
                        提交时间：
                        <span>{formatTime(solutionInfo.createTime)}</span>
                    </p>
                </div>
                {/* 如果错误，显示 errObj */}
                {solutionInfo.judge && solutionInfo.judge !== 2 && (
                    <div className="errBox">
                        <p>输入：{solutionInfo.errObj?.input}</p>
                        <p>输出：{solutionInfo.errObj?.userOutput}</p>
                        <p>预期输出：{solutionInfo.errObj?.sysOutput}</p>
                        <p>stdout：{solutionInfo.errObj?.stdout}</p>
                    </div>
                )}
                {/* 用户提交的代码 */}
                <div className="codeBox">
                    <h3>用户提交的代码</h3>
                    <p>语言：{formatLang(solutionInfo.lang)[0]}</p>
                    <Input.TextArea
                        disabled
                        value={solutionInfo.userCode}
                    ></Input.TextArea>
                </div>
            </div>
        </div>
    )
}

export default SolutionDetail
