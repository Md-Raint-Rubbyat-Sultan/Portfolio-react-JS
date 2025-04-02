import { useContext } from "react";
import { AuthContext } from "../../contextApis/AuthContext/AuthProvider";

const useAuthContext = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuthContext;
