import { briefExerciseProps } from "./exercise";

export interface UserProps {
    _id: string
    avatar: string
    username: string
    name: string
    isLogin: boolean
    rankId: {
        rank: string | number
    }
    introduction: string
    school: string[]
    sex?: 'male' | 'female' | ''
    location: string
    website: string
    birthday: any
    companys: CompanyProps[]
    schools: SchoolProps[]
    work: string,
    likesTotal?: number,
    starsTotal?: number,
    youFollowHim?: boolean,
    heFollowYou?: boolean,
    follows?: UserProps[],
    followers?: UserProps[]
    starExercise?: briefExerciseProps[]
}

export interface CompanyProps {
    name: string
    title: string
}
export interface SchoolProps {
    name: string
    time: string
}