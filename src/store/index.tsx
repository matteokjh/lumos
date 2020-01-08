// store
import React, { createContext, useReducer } from 'react'
import { contextProps } from '../types/index'
import { stateProps } from '../types/index'
import { actionProps, Reducer } from './storeProps'

const initialContext = {
  state: {
    userInfo: {
      name: '',
      avatar: '',
      username: '',
      isLogin: false
    },
    showLoginModal: false,
    showRegisterModal: false,
  },
  dispatch: () => {}
} as contextProps

const store = createContext(initialContext)
const { Provider } = store

const reducer: Reducer<stateProps, actionProps> = (state, action) => {
    switch (action.type) {
        // 设置用户信息
        case 'SET_USER':
            return {
                ...state,
                userInfo: {
                  ...action.payload,
                  isLogin: true
                },
            }
        // 显示登录弹框
        case 'SHOW_LOGIN_MODAL': 
            return {
              ...state,
              showLoginModal: action.payload,
            }
        // 显示注册弹框
        case 'SHOW_REGISTER_MODAL': 
            return {
              ...state,
              showRegisterModal: action.payload,
            }
        default:
            throw new Error()
    }
}

const StateProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(reducer, initialContext.state)

    return <Provider value={{ state, dispatch }}>{children}</Provider>
}

export { store, StateProvider }
