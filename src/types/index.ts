import { UserProps } from './user'


export interface stateProps {
    userInfo: UserProps,
    showLoginModal: boolean,
    showRegisterModal: boolean
}

export interface contextProps {
    state: stateProps,
    dispatch: React.Dispatch<any>
}

export interface SearchObjProps {
    
}