import React from "react";
import { Button, Menu, Input } from "antd";
import "@/styles/ConsoleBox.sass";
import { ExerciseProps } from "@/types/exercise";
import { DownOutlined, UpOutlined, LoadingOutlined } from "@ant-design/icons";
import { consoleBoxType, SolutionProps } from "@/types/solution";
import ResultBox from "./ResultBox";

interface ConsoleBoxProps {
    consoleActive: consoleBoxType;
    result: SolutionProps;
    isRunning: boolean;
    isOpen: boolean;
    exercise: ExerciseProps;
    singleCaseInput: string;
    setConsoleActive: (e: consoleBoxType) => void;
    showConsole: () => void;
    testRun: () => void;
    submitRun: () => void;
    changeSingleCase: (e: any) => void;
}

const ConsoleBox = (props: ConsoleBoxProps) => {
    const {
        showConsole,
        consoleActive,
        setConsoleActive,
        result,
        isRunning,
        testRun,
        submitRun,
        changeSingleCase,
        isOpen,
        exercise,
        singleCaseInput,
    } = props;

    return (
        <div className="ConsoleBox">
            {isOpen && (
                <>
                    {/* 顶部菜单 */}
                    <div className="console_top">
                        <div className="console_menu">
                            <Menu
                                onClick={(e: any) =>
                                    setConsoleActive(e.key as consoleBoxType)
                                }
                                mode="horizontal"
                                selectedKeys={[consoleActive]}
                            >
                                <Menu.Item key="testcase" disabled={isRunning}>
                                    测试用例
                                </Menu.Item>
                                <Menu.Item key="result" disabled={isRunning}>
                                    运行结果
                                </Menu.Item>
                            </Menu>
                        </div>
                        <span onClick={showConsole} className="console_icon">
                            {isOpen ? <DownOutlined /> : <UpOutlined />}
                        </span>
                    </div>
                    {/* 中间主体 */}
                    <div className="console_mid">
                        {/* 测试用例 */}
                        {consoleActive === "testcase" ? (
                            <div className="testcaseBox">
                                <Input.TextArea
                                    defaultValue={
                                        singleCaseInput ||
                                        exercise.defaultTestCase?.input
                                    }
                                    onChange={changeSingleCase}
                                    spellCheck={false}
                                ></Input.TextArea>
                            </div>
                        ) : (
                            // 运行结果
                            <ResultBox
                                isRunning={isRunning}
                                result={result}
                                singleCaseInput={singleCaseInput}
                            ></ResultBox>
                        )}
                    </div>
                </>
            )}
            {/* 底部按钮 */}
            <div className="console_bottom">
                {isRunning && (
                    <span className="waiting">
                        <span>等待中</span>
                        <LoadingOutlined />
                    </span>
                )}
                <div className="left">
                    <Button
                        size="small"
                        onClick={showConsole}
                        disabled={isRunning}
                    >
                        控制台
                    </Button>
                </div>
                <div className="right">
                    <Button onClick={testRun} disabled={isRunning}>
                        测试运行
                    </Button>
                    <Button
                        onClick={submitRun}
                        type="primary"
                        disabled={isRunning}
                    >
                        提交
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConsoleBox;
