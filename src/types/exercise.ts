export interface ExerciseProps {
    id: string; // 编号
    title: string; // 标题
    mode: ModeProps; // 难度
    introduction: string; // 题目介绍
    contributor: string; // 贡献者
    createTime: number; // 创建时间
    modifiedTime: number; // 创建时间
    code?: CodeProps; // 题目代码
    submitTimes: number; // 提交次数
    passTimes: number; // 通过次数
    defaultTestCase: testCaseProps; // 测试用例
    lang: LangProps; // 题目指定语言
    isStar?: boolean // 是否被用户收藏
}
export type ModeProps = "Easy" | "Medium" | "Hard"
export interface briefExerciseProps {
    id: number; // 编号
    title: string; // 标题
    mode: ModeProps; // 难度
    submitTimes: number; // 提交次数
    passTimes: number; // 通过次数
    isStar?: boolean
}
export const LangArr = <const>["javascript", "cpp", "java", "c"];
export type LangProps = Partial<typeof LangArr>;
export type CodeProps = {
    [key in typeof LangArr[number]]?: string;
};
export interface testCaseProps {
    input: string;
    output: string;
    text: string;
    uuid: string;
}
export type ExecOpType = "testRun" | "submit";
