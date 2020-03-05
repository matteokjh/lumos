import fetch from './index'
import { LangArr, ExecOpType } from '@/types/exercise'
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
    opType: ExecOpType
    username: string
    exerciseId: number
    lang: typeof LangArr[number]
    code: string
    singleCaseInput?: string
}) => {
    return fetch.post(`${PREFIX}/execute`, obj)
}
