import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";

const authLogout = () => {
  const urlSecure = useAxiosSecure();

  const { data: logoutInfo, isLoading } = useQuery({
    queryKey: ["logout"],
    queryFn: async () => {
      try {
        const { data } = await urlSecure.post("/auth/logout");
        return data;
      } catch (error) {
        return [null, false];
      }
    },
  });
  return [logoutInfo, isLoading];
};

export default authLogout;
