import { useContext } from "react";
import { AuthContext } from "../../contextApis/AuthContext/AuthProvider";

const useAuthContext = () => {
  return useContext(AuthContext);
};

export default useAuthContext;
