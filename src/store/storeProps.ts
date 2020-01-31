import { UserProps } from '../types/user'

export interface setUserAction {
    type: 'SET_USER'
    payload: UserProps
}
export interface showLoginModalAction {
    type: 'SHOW_LOGIN_MODAL'
    payload: boolean
}
export interface showRegisterModalAction {
    type: 'SHOW_REGISTER_MODAL'
    payload: boolean
}
export interface setAvatarAction {
    type: 'SET_AVATAR'
    payload: string
}

export type actionProps =
    | setUserAction
    | setAvatarAction
    | showLoginModalAction
    | showRegisterModalAction

export type Reducer<S, A> = (prevState: S, action: A) => S
