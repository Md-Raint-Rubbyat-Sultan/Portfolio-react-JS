import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios/useAxios";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";

const getSingleProject = (id) => {
  const url = useAxios();

  const { data: singleProject, isLoading } = useQuery({
    queryKey: ["single-Project", id],
    queryFn: async () => {
      try {
        const { data } = await url.get(`/projects/${id}`);
        return data;
      } catch (error) {
        toast(error.message, details("top-center", "❌​​"));
      }
    },
  });
  return [singleProject, isLoading];
};

export default getSingleProject;
