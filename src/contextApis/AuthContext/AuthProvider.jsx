import React, { createContext, useEffect, useState } from "react";
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

  const [isLoading, setIsLoading] = useState(false); // Use for only handeling post methods on auth.

  // Auth operations will use useMutation
  const { mutateAsync: login } = useMutation({
    mutationFn: ({ email, password }) => authLogin(email, password),
  });

  const { mutateAsync: register } = useMutation({
    mutationFn: ({ fullName, email, password, profilePic, verificationCode }) =>
      authRegister(fullName, email, password, profilePic, verificationCode),
  });

  const { mutateAsync: verifyEmail } = useMutation({
    mutationFn: ({ email }) => authVerifyEmail(email),
  });

  const { mutateAsync: logout } = useMutation({
    mutationFn: () => authLogout(),
  });

  const { mutateAsync: loginWithGoogle, isPending: isGoogleAuthLoading } =
    useMutation({
      mutationFn: () => signInWithPopup(auth, googleProvider),
    });

  const { mutateAsync: loginWithFacebook } = useMutation({
    mutationFn: () => signInWithPopup(auth, facebookProvider),
  });

  const info = {
    user,
    isUserLoading,
    refetch,
    isLoading,
    setIsLoading,
    verifyEmail,
    register,
    login,
    loginWithGoogle,
    isGoogleAuthLoading,
    loginWithFacebook,
    logout,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
