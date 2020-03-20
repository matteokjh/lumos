import fetch from './index'
import { LangArr, ExecOpType, testCaseProps } from '@/types/exercise'
const PREFIX = '/exercise'

export const getExerciseList = () => {
    return fetch.get(`${PREFIX}/getExerciseList`)
}
export const getExerciseInfo = (id: number) => {
    return fetch.get(`${PREFIX}/getExercise`, {
        params: {
            id,
        },
    })
}
// 运行
export const execute = (obj: {
    opType: ExecOpType;
    exerciseId: string;
    lang: typeof LangArr[number];
    code: string;
    testcase?: testCaseProps;
    singleCaseInput?: string;
}) => {
    return fetch.post(`/user${PREFIX}/execute`, obj);
};
