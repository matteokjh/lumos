import fetch from './';

export const getList = (obj?: {
    id?: string;
    username?: string;
    startAt?: number;
    endAt?: number;
}) => {
    return fetch.get(`/user/solution/list`, {
        params: obj,
    });
};

export const getSolution = (sid: string) => {
    return fetch.get(`/user/solution`, {
        params: {
            sid,
        },
    });
};
