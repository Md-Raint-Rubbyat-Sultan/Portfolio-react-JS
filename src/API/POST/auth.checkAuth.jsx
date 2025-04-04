import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";

const checkAuth = () => {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get("/auth/check-auth");

        return data || null;
      } catch (error) {
        console.log(error);
      }
    },
    retry: 1,
  });
  return [user, isLoading, refetch];
};

export default checkAuth;
