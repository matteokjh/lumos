export interface userProps {
    avatar: string,
    username: string,
    name: string,
    isLogin: boolean,
    rankId: {
        rank: string | number
    },
    introduction: string,
    company: string[],
    school: string[],
    sex?: 'male' | 'female' | '',
    location: string,
    website: string,
    birthday: any
}