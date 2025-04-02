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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAuthOperation = async (operation) => {
    // callback to better perform
    setIsLoading(true);
    setError(null);
    try {
      const result = await operation();
      return result;
    } catch (err) {
      setError(err.message || "Authentication failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const login = (email, password) => {
    return handleAuthOperation(() => authLogin(email, password));
  };

  const loginWithGoogle = () => {
    return handleAuthOperation(() => signInWithPopup(auth, googleProvider));
  };

  const loginWithFacebook = () => {
    return handleAuthOperation(() => signInWithPopup(auth, facebookProvider));
  };

  const register = (fullName, email, password) => {
    return handleAuthOperation(() => authRegister(fullName, email, password));
  };

  const verifyEmail = (email) => {
    return handleAuthOperation(() => authVerifyEmail(email));
  };

  const logout = () => {
    return handleAuthOperation(() => authLogout());
  };

  const info = {
    user,
    isUserLoading,
    refetch,
    isLoading,
    setIsLoading,
    error,
    verifyEmail,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    clearError: () => setError(null),
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
