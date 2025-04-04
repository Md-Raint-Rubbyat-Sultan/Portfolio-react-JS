import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios/useAxios";
import details from "../../Constants/toastDetails";
import toast from "react-hot-toast";

const getAdminData = () => {
  const url = useAxios();

  const { data: adminData, isLoading } = useQuery({
    queryKey: ["admin-data"],
    queryFn: async () => {
      try {
        const { data } = await url.get("/adminData");
        return data;
      } catch (error) {
        toast(error.message, details("top-center", "❌​​"));
      }
    },
  });
  return [adminData, isLoading];
};

export default getAdminData;
