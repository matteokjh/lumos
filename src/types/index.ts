import { UserProps } from './user'
import { ExerciseProps } from './exercise';


export interface stateProps {
    userInfo: UserProps,
    exerciseInfo: ExerciseProps,
    showLoginModal: boolean,
    showRegisterModal: boolean
    showResetPwdModal: boolean
    lastSeen?: number
}

export interface contextProps {
    state: stateProps,
    dispatch: React.Dispatch<any>
}

export interface SearchObjProps {
    
}