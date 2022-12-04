import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const UserAuthCtx = createContext<any>(null);

type ChildComponents = {
  children: JSX.Element;
};

export const UserAuthCtxProvider = ({ children }: ChildComponents) => {
  const [userDataState, setUserDataState] = useState({});
  const [user, setUser] = useState();
  function signIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    signOut(auth);
    setUserDataState({});
  }
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser: any) => {
      setUser(currentUser);
    });
  }, [user]);
  return (
    <UserAuthCtx.Provider value={{ user, signIn, logOut, userDataState }}>
      {children}
    </UserAuthCtx.Provider>
  );
};

export function useUserAuth() {
  return useContext(UserAuthCtx);
}
