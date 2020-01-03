// store
import React, {createContext, useReducer} from 'react';
import { userProps } from '../types/user'

interface setUserAction {
  type: 'SET_USER',
  payload: userProps
}
type actionProps = setUserAction

interface stateProps {
  userInfo: userProps
}

const initialState = {
  userInfo: {} as userProps
};
const store = createContext(initialState);
const { Provider } = store;


const reducer = (state: stateProps, action: actionProps) => {
  switch(action.type) {
    case 'SET_USER':
      return {
        ...state,
        userInfo: action.payload
      }
    default:
      throw new Error();
  };
}

const StateProvider = ( { children }: any ) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider }