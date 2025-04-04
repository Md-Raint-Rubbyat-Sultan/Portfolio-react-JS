import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios/useAxios";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";

const getAllProjects = (lim = 5) => {
  const url = useAxios();
  const { data: allProjects, isLoading } = useQuery({
    queryKey: ["All_Projects", lim],
    queryFn: async () => {
      try {
        const { data } = await url.get(`/projects/all-projects?lim=${lim}`);
        return data;
      } catch (error) {
        toast(error.message, details("top-center", "❌​​"));
      }
    },
  });
  return [allProjects, isLoading];
};

export default getAllProjects;
