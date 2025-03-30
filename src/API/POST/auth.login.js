import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios/useAxios";

const authLogin = (email, password) => {
  const url = useAxios(); // Todo: this could be useAxiosSecure, as respose send a cookie

  const { data: loginInfo, isLoading } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      const { data } = await url.post("/auth/login", { email, password });
      return data;
    },
  });

  return [loginInfo, isLoading];
};

export default authLogin;
