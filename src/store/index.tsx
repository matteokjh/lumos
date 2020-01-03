// store
import React, { createContext, useReducer } from 'react'
import { contextProps } from '../types/index'
import { userProps } from '../types/user'
import { stateProps } from '../types/index'

interface setUserAction {
    type: 'SET_USER'
    payload: userProps
}
type actionProps = setUserAction

type Reducer<S, A> = (prevState: S, action: A) => S

const initialState = {
  userInfo: {
    name: '',
    avatar: '',
    username: ''
  }
}
const store = createContext(initialState)
const { Provider } = store

const reducer: Reducer<stateProps, actionProps> = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                userInfo: action.payload,
            }
        default:
            throw new Error()
    }
}

const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return <Provider value={{ state, dispatch } as contextProps}>{children}</Provider>
}

export { store, StateProvider }
