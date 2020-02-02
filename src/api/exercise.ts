import fetch from './index'

const PREFIX = '/exercise'

export const getExerciseList = (name: string, pageNum: number, pageSize: number) => {
    return fetch.get(`${PREFIX}/getExerciseList`, {
        params: {
            name,
            pageNum,
            pageSize
        }
    })
}