import { userProps } from './user'


export interface stateProps {
    userInfo: userProps
}

export interface contextProps {
    state: stateProps,
    dispatch: React.Dispatch<any>
}