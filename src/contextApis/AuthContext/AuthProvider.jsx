import React, { createContext } from "react";
import { useMutation } from "@tanstack/react-query";
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
  // Check auth status (this uses useQuery internally)
  const [user, isUserLoading, refetch] = checkAuth();

  // Auth operations will use useMutation
  const { mutateAsync: login, isLoading: isLoginLoading } = useMutation({
    mutationFn: ({ email, password }) => authLogin(email, password),
  });

  const { mutateAsync: register, isLoading: isRegisterLoading } = useMutation({
    mutationFn: ({ fullName, email, password, profile }) =>
      authRegister(fullName, email, password, profile),
  });

  const { mutateAsync: verifyEmail, isLoading: isVerifyLoading } = useMutation({
    mutationFn: ({ email }) => authVerifyEmail(email),
  });

  const { mutateAsync: logout, isLoading: isLogoutLoading } = useMutation({
    mutationFn: () => authLogout(),
  });

  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  const loginWithFacebook = () => {
    return signInWithPopup(auth, facebookProvider);
  };

  const isLoading =
    isUserLoading ||
    isLoginLoading ||
    isRegisterLoading ||
    isVerifyLoading ||
    isLogoutLoading;

  const info = {
    user,
    isLoading,
    isUserLoading,
    refetch,
    verifyEmail,
    register,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
