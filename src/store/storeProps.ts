import { UserProps } from '../types/user'
import { ExerciseProps } from '@/types/exercise'

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
export interface setExerciseAction {
    type: 'SET_EXERCISE'
    payload: ExerciseProps
}

export type actionProps =
    | setUserAction
    | setAvatarAction
    | showLoginModalAction
    | showRegisterModalAction
    | setExerciseAction

export type Reducer<S, A> = (prevState: S, action: A) => S
