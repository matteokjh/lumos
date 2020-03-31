import fetch from './'


export const getList = (id?: string) => {
    return fetch.get(`/user/solution/list`, {
        params: {
            id
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