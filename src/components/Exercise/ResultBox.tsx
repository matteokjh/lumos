import React from 'react'
import { Skeleton, Empty, Input } from 'antd'
import { formatMemory, formatJudgeResult, formatLang } from '@/utils/methods'
import { SolutionProps } from '@/types/solution'
import '@/styles/ResultBox.sass'

interface ResultBoxProps {
    isRunning: boolean
    result: SolutionProps
    singleCaseInput: string
}

interface TestRunProps {
    result: SolutionProps
    singleCaseInput: string
}

interface SubmitRunProps {
    result: SolutionProps
}

// 测试运行结果
const TestRun = (props: TestRunProps) => {
    const { result, singleCaseInput } = props

    return (
        <div>
            {/* 结果栏 */}
            <div
                className="res_info"
                style={{
                    backgroundColor: formatJudgeResult(result.judge)[3],
                }}
            >
                <span
                    className="res_done"
                    style={{
                        color: formatJudgeResult(result.judge)[2],
                    }}
                >
                    {formatJudgeResult(result.judge)[1]}
                </span>
                <span>
                    执行用时：
                    {result.time} ms
                </span>
                <span>
                    内存消耗：
                    {formatMemory(result.memory)}
                </span>
            </div>
            {result.judge === 2 || result.judge === 6 ? (
                <div className="AC_box">
                    {/* 输入 */}
                    <div>
                        <p>输入：</p>
                        <div className="valueBox">{singleCaseInput}</div>
                    </div>
                    {/* 输出 */}
                    <div>
                        <p>输出：</p>
                        <div className="valueBox">
                            {result.result[0].output}
                        </div>
                    </div>
                    {/* 预期结果 */}
                    <div>
                        <p>预期结果：</p>
                        <div className="valueBox">
                            {result.testdata[0].output}
                        </div>
                    </div>
                    {/* stdout */}
                    {result.result[0].stdout && (
                        <div>
                            <p>stdout：</p>
                            <div className="valueBox">
                                {result.result[0].stdout}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                // 除了 AC 和 WA，其它结果标红
                <div className="res_err">
                    <div>{result.result[0].stdout || '执行出错'}</div>
                </div>
            )}
        </div>
    )
}
// 提交运行结果
const SubmitRun = (props: SubmitRunProps) => {
    const { result } = props

    return (
        <div className="SubmitRun">
            {/* 结果栏 */}
            <div className="submit_res_info">
                <span
                    style={{
                        color: formatJudgeResult(result.judge)[2],
                        backgroundColor: formatJudgeResult(result.judge)[3],
                    }}
                >
                    {formatJudgeResult(result.judge)[1]}
                </span>
            </div>
            {(result.judge === 2 && (
                <div className="submit_res_info">
                    <p>
                        执行用时：
                        <b>{result.time} ms</b>，超过{' '}
                        <b>{result.timePercent}</b> 的{' '}
                        <b>{formatLang(result.lang)[0]}</b> 用户
                    </p>
                    <p>
                        内存消耗：
                        <b>{formatMemory(result.memory)}</b> ，超过{' '}
                        <b>{result.memoryPercent}</b> 的{' '}
                        <b>{formatLang(result.lang)[0]}</b> 用户
                    </p>
                </div>
            )) ||
                (result.judge === 6 && (
                    <div className="AC_box">
                        {/* 输入 */}
                        <div>
                            <p>输入：</p>
                            <div className="valueBox">
                                {result.errObj?.input}
                            </div>
                        </div>
                        {/* 输出 */}
                        <div>
                            <p>输出：</p>
                            <div className="valueBox">
                                {result.errObj?.userOutput}
                            </div>
                        </div>
                        {/* 预期结果 */}
                        <div>
                            <p>预期结果：</p>
                            <div className="valueBox">
                                {result.errObj?.sysOutput}
                            </div>
                        </div>
                        {/* stdout */}
                        {result.errObj?.stdout && (
                            <div>
                                <p>stdout：</p>
                                <div className="valueBox">
                                    {result.errObj?.stdout}
                                </div>
                            </div>
                        )}
                    </div>
                )) || (
                    <div className="res_err">
                        <div>{result.result[0].stdout || '执行出错'}</div>
                    </div>
                )}
        </div>
    )
}

const ResultBox = (props: ResultBoxProps) => {
    const { isRunning, result, singleCaseInput } = props

    return (
        <div className="ResultBox">
            {isRunning ? (
                <Skeleton active></Skeleton>
            ) : (
                // 区分测试运行结果和提交运行结果
                // 测试运行：如果成功运行，渲染：输入，输出，期望输出
                (result.state === 'success' && (
                    <div className="res_wrapper">
                        {/* 如果是测试运行 */}
                        {result.opType === 'testRun' ? (
                            <TestRun
                                singleCaseInput={singleCaseInput}
                                result={result}
                            ></TestRun>
                        ) : (
                            <SubmitRun result={result}></SubmitRun>
                        )}
                    </div>
                )) ||
                // 报错，渲染错误信息
                (result.state === 'error' && (
                    <div className="res_err">
                        <Input.TextArea
                            value={result.error || '执行出错'}
                            disabled
                        ></Input.TextArea>
                    </div>
                )) || (
                    // 未运行，空
                    <div className="empty">
                        <Empty
                            description="暂无数据"
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                        ></Empty>
                    </div>
                )
            )}
        </div>
    )
}

export default ResultBox
