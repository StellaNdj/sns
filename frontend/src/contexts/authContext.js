import React, { createContext } from 'react';
import { useEffect, useReducer } from 'react';

export const AuthContext = createContext({});

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload};
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
}

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  })

  useEffect(() => {
    const userData = localStorage.getItem('user');

    if(userData !== null) {
      const user = JSON.parse(userData);
      dispatch({type: 'LOGIN', payload: user})
    }
  }, [])

  console.log('Auth context state', state);

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
