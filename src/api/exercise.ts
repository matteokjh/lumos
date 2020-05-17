import fetch from './index';
import { LangArr, ExecOpType, testCaseProps } from '@/types/exercise';
const PREFIX = '/exercise';

export const getExerciseList = (obj: { username: string }) => {
    return fetch.get(`${PREFIX}/getExerciseList`, {
        params: obj,
    });
};
export const getExerciseInfo = (obj: {id: string, username: string}) => {
    return fetch.get(`${PREFIX}/getExercise`, {
        params: obj
    });
};
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

// 收藏题目
export const starExercise = (obj: {id: string}) => {
    return fetch.put(`/user${PREFIX}/star`, obj)
}

// 获取收藏列表
export const getStarList = () => {
    return fetch.get(`/user${PREFIX}/getStarList`)
}
