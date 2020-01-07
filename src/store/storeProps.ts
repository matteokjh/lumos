import { userProps } from '../types/user'


export interface setUserAction {
    type: 'SET_USER'
    payload: userProps
}
export interface showLoginModalAction {
    type: 'SHOW_LOGIN_MODAL'
    payload: boolean
}
export type actionProps = setUserAction | showLoginModalAction

export type Reducer<S, A> = (prevState: S, action: A) => S