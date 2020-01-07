import { userProps } from './user'


export interface stateProps {
    userInfo: userProps,
    showLoginModal: boolean
}

export interface contextProps {
    state: stateProps,
    dispatch: React.Dispatch<any>
}