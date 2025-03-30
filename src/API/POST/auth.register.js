import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../CustomHooks/useAxiosSecure/useAxiosSecure";

const authRegister = (fullName, email, password, profilePic = "") => {
  const url = useAxiosSecure();

  const { data: registerInfo, isLoading } = useQuery({
    queryKey: ["register"],
    queryFn: async () => {
      const { data } = await url.post("/auth/register", {
        fullName,
        email,
        password,
        profilePic,
      });
      return data;
    },
  });

  return [registerInfo, isLoading];
};

export default authRegister;
