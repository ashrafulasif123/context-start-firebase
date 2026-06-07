import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../../firebase.init";
import { useEffect, useState } from "react";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    // set the observer
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      }
      else {
        setUser(null);
      }
    });
    // clear the observer the on unmount
    return () => {

      unsubscribe();
    };
  }, []);

  const authInfo = { user, createUser, signIn, logOut, loading };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
