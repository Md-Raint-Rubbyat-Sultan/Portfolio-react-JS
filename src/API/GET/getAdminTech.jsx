import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios/useAxios";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";

const getAdminTech = () => {
  const url = useAxios();

  const { data: adminTech, isLoading } = useQuery({
    queryKey: ["admin-tech"],
    queryFn: async () => {
      try {
        const { data } = await url.get("/adminData/adminTech");
        return data;
      } catch (error) {
        toast(error.message, details("top-center", "❌​​"));
      }
    },
  });
  return [adminTech, isLoading];
};

export default getAdminTech;
