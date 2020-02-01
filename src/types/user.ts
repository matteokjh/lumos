export interface UserProps {
    avatar: string,
    username: string,
    name: string,
    isLogin: boolean,
    rankId: {
        rank: string | number
    },
    introduction: string,
    school: string[],
    sex?: 'male' | 'female' | '',
    location: string,
    website: string,
    birthday: any,
    companys: CompanyProps[],
    schools: SchoolProps[]
}

export interface CompanyProps {
    name: string,
    title: string
}
export interface SchoolProps {
    name: string,
    time: string
}