import fetch from './index';
import { LoginProps } from '../components/modals/types/login';
import { UserProps } from '../types/user';

const PREFIX = '/user';

// 获取自己的 token
export const getToken = () => {
    return fetch.get(`${PREFIX}/`);
};
// 获取用户信息
export const getUserInfo = (username: string) => {
    return fetch.get(`${PREFIX}/userinfo`, {
        params: {
            username: username,
        },
    });
};
// 注册
export const register = (data: LoginProps) => {
    return fetch.post(`${PREFIX}/register`, data);
};
// 重发激活邮件
export const resend = (data: LoginProps) => {
    return fetch.post(`${PREFIX}/resendemail`, data);
};
// 登录
export const login = (data: LoginProps) => {
    return fetch.post(`${PREFIX}/login`, data);
};
// 注销
export const logout = async () => {
    return fetch.post(`${PREFIX}/logout`);
};
// 全站排名
export const getRank = async (data: string) => {
    console.log(data);
    return fetch.get(`${PREFIX}/rank`, {
        params: {
            username: data,
        },
    });
};
// 修改个人资料
export const setSelfInfo = async (data: UserProps) => {
    return fetch.put(`${PREFIX}/setuserinfo`, data);
};
// 上传头像
export const uploadAvatar = async (imageUrl: { base64: string }) => {
    return fetch.put(`${PREFIX}/uploadavatar`, imageUrl);
};
// 关注/取消关注 用户
export const userFollow = async (userId: string) => {
    return fetch.put(`${PREFIX}/follow`, {
        userId,
    });
};
// 获取作者榜
export const getAuthorList = () => fetch.get(`${PREFIX}/authorList`);
// 获取用户提交日历
export const getCalendar = (obj?: {
    id?: string;
    username?: string;
    startAt?: number;
    endAt?: number;
}) => fetch.get(`${PREFIX}/calendar`, { params: obj });
// 获取用户主页的最近提交记录
export const getSolutionLsit = (obj?: {
    username?: string;
    startAt?: number;
    endAt?: number;
}) => fetch.get(`${PREFIX}/solutionList`, { params: obj });
