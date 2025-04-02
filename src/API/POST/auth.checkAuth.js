import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";

const checkAuth = () => {
  const urlSecure = useAxiosSecure();

  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await urlSecure.post("/auth/check-auth");

      if (!data) return null;
      return data;
    },
    retry: 1,
  });
  return [user, isLoading, refetch];
};

export default checkAuth;
