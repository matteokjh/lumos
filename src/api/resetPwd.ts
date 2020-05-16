import fetch from './index';

const PREFIX = '/resetPwd';

// 忘记密码-验证邮箱
export const confirmUsername = (obj: { username: string }) => {
    return fetch.post(`${PREFIX}/confirmUsername`, obj);
};
// 重置密码
export const verifyToken = (obj: { token: string }) => {
    return fetch.post(`${PREFIX}/verifyToken`, obj);
};
export const resetPwd = (obj: { newPwd: string, token: string }) => {
    return fetch.put(`${PREFIX}/`, obj);
};