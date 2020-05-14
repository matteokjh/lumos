import { UserProps } from '../types/user'
import { ExerciseProps } from '@/types/exercise'

interface setUserAction {
    type: 'SET_USER'
    payload: UserProps
}
interface showLoginModalAction {
    type: 'SHOW_LOGIN_MODAL'
    payload: boolean
}
interface showRegisterModalAction {
    type: 'SHOW_REGISTER_MODAL'
    payload: boolean
}
interface setAvatarAction {
    type: 'SET_AVATAR'
    payload: string
}
interface setExerciseAction {
    type: 'SET_EXERCISE'
    payload: ExerciseProps
}
interface setLastSeen {
    type: 'SET_LASTSEEN'
    payload: number
}

export type actionProps =
    | setUserAction
    | setAvatarAction
    | showLoginModalAction
    | showRegisterModalAction
    | setExerciseAction
    | setLastSeen

export type Reducer<S, A> = (prevState: S, action: A) => S
