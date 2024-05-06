import React, { useReducer } from "react";
import { createContext } from "react";

export const postContext = createContext();

export const postReducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        posts: action.payload
      };
    case 'CREATE_POST':
      return {
        posts: [action.payload, ...state.posts]
      }
    case 'DELETE_POST':
      return {
        posts: state.posts.filter((post) => post._id !== action.payload)
      }
    case 'UPDATE_LIKES_POST':
      return {
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        )
      }
    default:
      return state;
  }
}

export const PostContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(postReducer, {
    posts: []
  })

  return (
    <postContext.Provider value={{...state, dispatch}}>
      {children}
    </postContext.Provider>
  )
};
