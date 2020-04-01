import React, { useEffect, useState, useRef, useContext } from 'react'
import { ExerciseProps } from '@/types/exercise'
import { getExerciseInfo, execute } from '@/api/exercise'
import { message, Select, Button } from 'antd'
import { LangArr } from '@/types/exercise'
import MonacoEditor, { EditorDidMount } from 'react-monaco-editor'
import ReactResizeDetector from 'react-resize-detector'
import ConsoleBox from '@/components/Exercise/ConsoleBox'
import { LANGS } from '@/utils/config'
import '@/pages/styles/ExerciseDetail.sass'
import { store } from '@/store'
import { useHistory, useLocation } from 'react-router-dom'
import DetailNav from '@/components/Exercise/DetailNav'
import DetailNavigate from '@/components/Exercise/DetailNavigate'
import { SolutionProps } from '@/types/solution'
import { getSolution } from '@/api/solution'
const { Option } = Select

type consoleBoxType = 'result' | 'testcase'


const ExerciseDetail = (props: any) => {
    const { dispatch } = useContext(store)
    const location = useLocation()
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
    const [result, setResult] = useState({} as SolutionProps)
    // 正在运行
    const [isRunning, setIsRunning] = useState(false)
    const history = useHistory()
    // t
    let T = 5;
    const [timer, setTimer] = useState([] as any);
    // 当前题号
    const [id] = useState(props.match.params.id);

    // methods
    const goBack = () => {
        history.push("/exercise/all")
    }
    // 初始化
    const editorDidMount: EditorDidMount = (editor, monaco) => {
        console.log(exercise)
    }
    // 代码编辑
    const codeChange = (val: string) => {
        setCode(val)
        saveStorage(val);
    }
    // 存 localStorage
    const saveStorage = (val: string) => {
        if (!localStorage[`lumos_code_${id}`]) {
            localStorage[`lumos_code_${id}`] = JSON.stringify({});
        }
        let obj = JSON.parse(localStorage[`lumos_code_${id}`]);
        obj[LumosLanguage] = val;
        localStorage[`lumos_code_${id}`] = JSON.stringify(obj);
    };
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
    }// 获取运行结果
    const getRes = async (sid: string) => {
        try {
            let res = await getSolution(sid);
            if (res.code === 200) {
                console.log(res);
                if (res.data.state === "pending" && T) {
                    let t = setTimeout(() => {
                        T--;
                        getRes(sid);
                    }, 3000);
                    setTimer(timer.concat(t));
                } else {
                    if (T === 0) {
                        message.error("执行出错");
                    }
                    setResult(res.data);
                    setIsRunning(false);
                    T = 5;
                }
            } else {
                message.error(res.msg);
                setIsRunning(false);
            }
        } catch (err) {
            message.error(err);
            setIsRunning(false);
        }
    };
    // 测试运行
    const testRun = async () => {
        setIsRunning(true);
        setConsoleActive("result");
        setIsOpen(true);
        try {
            let res = await execute({
                opType: "testRun",
                exerciseId: exercise.id,
                code: code,
                lang: LumosLanguage,
                singleCaseInput: singleCaseInput
            });
            console.log(res);
            if (res.code === 200) {
                getRes(res.data);
            } else {
                message.error(res.msg);
                setIsRunning(false);
            }
        } catch (err) {
            message.error(err);
            setIsRunning(false);
        }
    }
    // 运行
    const submitRun = async () => {
        setIsRunning(true);
        setConsoleActive("result");
        setIsOpen(true);
        try {
            let res = await execute({
                opType: "submit",
                exerciseId: exercise.id,
                code: code,
                lang: LumosLanguage
            });
            console.log(res);
            if (res.code === 200) {
                getRes(res.data);
            } else {
                message.error(res.msg);
                setIsRunning(false);
            }
        } catch (err) {
            message.error(err);
            setIsRunning(false);
        }
    }
    // 更改测试用例
    const changeSingleCase = (e: any) => {
        setSingleCaseInput(e.target.value)
    }
    
    useEffect(() => {
        return () => {
            for (let t of timer) {
                clearTimeout(t);
            }
        };
    }, [timer]);

    useEffect(() => {
        let obj = {} as any;
        if (localStorage[`lumos_code_${id}`]) {
            obj = JSON.parse(localStorage[`lumos_code_${id}`]);
        }
        setCode(
            obj[LumosLanguage]
                ? obj[LumosLanguage]
                : exercise?.code?.[LumosLanguage] || ""
        );
        exercise.defaultTestCase &&
            setSingleCaseInput(exercise.defaultTestCase.input)

        dispatch({
            type: 'SET_EXERCISE',
            payload: exercise,
        })
    }, [exercise, LumosLanguage, dispatch, id])

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
                        <Button onClick={goBack}>返回</Button>
                    </h1>
                </div>
                <div
                    className="exc_main"
                    onKeyDown={handleKeyDown}
                    onKeyUp={handleKeyUp}
                >
                    {/* 左边 */}
                    <div className="exc_info">
                        <DetailNav></DetailNav>
                        <DetailNavigate></DetailNavigate>
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
                            testRun={testRun}
                            submitRun={submitRun}
                            changeSingleCase={changeSingleCase}
                            consoleActive={consoleActive}
                            setConsoleActive={setConsoleActive}
                            result={result}
                            isRunning={isRunning}
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
