import fetch from './'


export const getList = (sid?: string) => {
    return fetch.get(`/user/solution/list`, {
        params: {
            sid
        }
    })
}

export const getSolution = (sid: string) => {
    return fetch.get(`/user/solution`, {
        params: {
            sid
        }
    })
}