import React, { useEffect, useState, useRef, useContext } from 'react'
import { ExerciseProps } from '@/types/exercise'
import { getExerciseInfo, execute } from '@/api/exercise'
import { message, Select, Button } from 'antd'
import ReactMarkdown from 'react-markdown/with-html'
import CodeBlock from './components/react-markdown-code-block'
import ReactMarkdownLink from './components/react-markdown-link'
import { LangArr } from '../types/exercise'
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor'
import ReactResizeDetector from 'react-resize-detector'
import ConsoleBox from './components/ConsoleBox'
import { LANGS } from '@/utils/config'
import '@/pages/styles/ExerciseDetail.sass'
import { store } from '@/store'
import { useHistory } from 'react-router-dom'
const { Option } = Select

type consoleBoxType = 'result' | 'testcase'

type outputType = {
    stdout_output: string
    result_output: string
}

type resultType = {
    state: 'true' | 'error' | 'false'
    output: outputType[]
}
const ExerciseDetail = (props: any) => {
    const { userInfo } = useContext(store).state
    const [exercise, setExercise] = useState({} as ExerciseProps)
    const CodeRef = useRef(null as any)
    const [code, setCode] = useState('')
    const [LumosLanguage, setLumosLanguage] = useState(
        (localStorage['lumos-language'] ||
            'javascript') as typeof LangArr[number]
    )
    const [isOpen, setIsOpen] = useState(false)
    // 用户自定的一个测试用例，默认为所有测试用例的第一个
    const [singleCaseInput, setSingleCaseInput] = useState('')
    // 控制台
    const [consoleActive, setConsoleActive] = useState(
        'result' as consoleBoxType
    )
    // 输出
    const [result, setResult] = useState({} as resultType)
    // 正在运行
    const [isRunning, setIsRunning] = useState(false)
    const history = useHistory()

    // methods
    const goBack = () => {
        history.go(-1)
    }
    // 初始化
    const editorDidMount: EditorDidMount = (editor, monaco) => {
        console.log(exercise)
    }
    // 代码编辑
    const codeChange = (val: string) => {
        setCode(val)
    }
    // 变更语言
    const handleChange = (value: typeof LangArr[number]) => {
        setLumosLanguage(value)
    }
    // 阻止 ctrl s 默认事件
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        // ctrl or command
        if (
            (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) &&
            e.keyCode === 83
        ) {
            e.preventDefault()
        }
    }
    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {}
    // 控制台
    const showConsole = () => {
        setIsOpen(!isOpen)
    }
    // 测试运行
    const testRun = async () => {
        setIsRunning(true)
        setConsoleActive('result')
        setIsOpen(true)
        try {
            let res = await execute({
                opType: 'testRun',
                exerciseId: exercise.id,
                code: code,
                lang: LumosLanguage,
                username: userInfo.username,
                singleCaseInput: singleCaseInput,
            })
            console.log(res)
            if (res.code === 200) {
                setResult(res.data)
            } else {
                message.error(res.msg)
            }
        } catch (err) {
            message.error(err)
        }
        setIsRunning(false)
    }
    // 运行
    const submitRun = async () => {
        setIsRunning(true)
        setConsoleActive('result')
        setIsOpen(true)
        try {
            let res = await execute({
                opType: 'submit',
                exerciseId: exercise.id,
                code: code,
                lang: LumosLanguage,
                username: userInfo.username,
            })
            console.log(res)
            if (res.code === 200) {
            } else {
            }
        } catch (err) {
            message.error(err)
        }
        setIsRunning(false)
    }
    // 更改测试用例
    const changeSingleCase = (e: any) => {
        setSingleCaseInput(e.target.value)
    }
    // methods
    useEffect(() => {
        setCode(exercise?.code?.[LumosLanguage] || '')
        exercise.defaultTestCase &&
            setSingleCaseInput(exercise.defaultTestCase.input)
    }, [exercise, LumosLanguage])

    useEffect(() => {
        let id = props.match.params.id
        ;(async () => {
            try {
                let res = await getExerciseInfo(id)
                if (res.code === 200) {
                    setExercise(res.data)
                    console.log(res.data)
                } else {
                    message.error(res.msg)
                }
            } catch (err) {
                message.error(err)
            }
        })()
    }, [props.match.params.id])

    return (
        <div className="ExerciseDetail">
            <div className="Execute">
                <div className="exc_title">
                    <h1>
                        {exercise.id}. {exercise.title}
                    </h1>
                    <Button onClick={goBack}>返回</Button>
                </div>
                <div
                    className="exc_main"
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                >
                    {/* 左边介绍 */}
                    <div className="exc_info">
                        <ReactMarkdown
                            source={exercise.introduction}
                            escapeHtml={false}
                            renderers={{
                                code: CodeBlock,
                                link: ReactMarkdownLink,
                            }}
                        ></ReactMarkdown>
                    </div>
                    {/* 右边代码编辑模块 */}
                    <div className="exc_code">
                        {/* 语言选择 */}
                        <div className="exc_toolbar">
                            <Select
                                style={{
                                    minWidth: 255,
                                }}
                                value={LumosLanguage}
                                onChange={handleChange}
                            >
                                {exercise.lang?.map(e => (
                                    <Option value={e || ''} key={e}>
                                        {LANGS(e).label || ''}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                        {/* 代码编辑器 */}
                        <div className="exc_code_wrapper">
                            <ReactResizeDetector
                                handleWidth
                                handleHeight
                                refreshMode="throttle"
                                refreshRate={100}
                            >
                                <MonacoEditor
                                    ref={CodeRef}
                                    defaultValue={code}
                                    value={code}
                                    language={LumosLanguage}
                                    theme="vs-dark"
                                    onChange={codeChange}
                                    editorDidMount={editorDidMount}
                                    options={{
                                        scrollBeyondLastLine: false,
                                    }}
                                ></MonacoEditor>
                            </ReactResizeDetector>
                        </div>
                        {/* 控制台 */}
                        <ConsoleBox
                            showConsole={showConsole}
                            consoleActive={consoleActive}
                            setConsoleActive={setConsoleActive}
                            result={result}
                            isRunning={isRunning}
                            testRun={testRun}
                            submitRun={submitRun}
                            changeSingleCase={changeSingleCase}
                            isOpen={isOpen}
                            exercise={exercise}
                            singleCaseInput={singleCaseInput}
                        ></ConsoleBox>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExerciseDetail
