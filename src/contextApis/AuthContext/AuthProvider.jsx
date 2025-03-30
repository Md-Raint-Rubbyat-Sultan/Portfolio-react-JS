import React, { createContext, useState } from "react";
import checkAuth from "../../API/POST/auth.checkAuth";
import authLogout from "../../API/POST/auth.logout";
import authLogin from "../../API/POST/auth.login";
import authRegister from "../../API/POST/auth.register";
import authVerifyEmail from "../../API/POST/auth.emailVerification";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../configs/firebase.config";

export const AuthContext = createContext(null);

// providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, isUserLoading, refetch] = checkAuth();
  const [isLoading, setIsloading] = useState(false); // set this to false after login, register or even logout

  const login = (email, password) => {
    setIsloading(true);
    return authLogin(email, password);
  };

  // providers login
  const loginWithGoogle = () => {
    setIsloading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const loginWithFacebook = () => {
    setIsloading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  const register = (fullName, email, password) => {
    setIsloading(true);
    return authRegister(fullName, email, password);
  };

  const verifyEmail = (email) => {
    setIsloading(true);
    return authVerifyEmail(email);
  };

  const logout = () => {
    setIsloading(true);
    return authLogout(); // this will give an arry of logout info and is loading state.
  };

  const info = {
    user,
    isUserLoading,
    refetch,
    verifyEmail,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    isLoading,
    setIsloading,
  };
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
