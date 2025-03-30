import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios/useAxios";

const authVerifyEmail = (email) => {
  const url = useAxios(); // Todo: this could be useAxiosSecure, as respose send a cookie

  const { data: verificaionInfo, isLoading } = useQuery({
    queryKey: ["verify-email"],
    queryFn: async () => {
      const { data } = await url.post("/auth/verify-email", {
        email,
      });
      return data;
    },
  });

  return [verificaionInfo, isLoading];
};

export default authVerifyEmail;
