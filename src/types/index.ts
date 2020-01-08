import { userProps } from './user'


export interface stateProps {
    userInfo: userProps,
    showLoginModal: boolean,
    showRegisterModal: boolean
}

export interface contextProps {
    state: stateProps,
    dispatch: React.Dispatch<any>
}