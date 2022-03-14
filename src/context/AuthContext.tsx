import { createContext, FC, useEffect, Dispatch, useReducer } from "react";
import firebase from 'firebase/app'; // <~~ Need this line for the proper typing ¯\_(ツ)_/¯
import { projectAuth } from '../firebase/config'

type User = firebase.User | null;

type Action =
  | { type: 'LOGIN', payload: User }
  | { type: 'LOGOUT' }
  | { type: 'AUTH_IS_READY', payload: User }

type ContextState = {
  user: User;
  authIsReady: boolean;
  dispatch?: Dispatch<Action>; //   dispatch: ({type}:{type:string}) => void;
};

export const AuthContext = createContext<Partial<ContextState> | null>(null);

export const authReducer = (state: ContextState, action: Action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload }
    case "LOGOUT":
      return { ...state, user: null }
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true }
    default:
      return state
  }
}

export const AuthContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  });
  /* From https://old.reddit.com//r/reactjs/comments/pun9vp/help_with_react_usecontext_for_firebase_auth/
      const [user, setUser] = useState<User>(null)
      const value = { user }
  */


  useEffect(() => {
    const unsubscribe = projectAuth.onAuthStateChanged(user => {
      dispatch({ type: 'AUTH_IS_READY', payload: user })
      // unsubscribe() // ?? Shouldn't this be outside of um, itself?
    })
    return unsubscribe()
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}