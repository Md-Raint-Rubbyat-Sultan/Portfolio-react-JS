import { useQuery } from "@tanstack/react-query";
import useAxios from "../../CustomHooks/useAxios/useAxios";
import toast from "react-hot-toast";
import details from "../../Constants/toastDetails";

const getProtfolioImg = () => {
  const url = useAxios();
  const { data: portfolioImg, isLoading } = useQuery({
    queryKey: ["portfolio-img"],
    queryFn: async () => {
      try {
        const { data } = await url.get("/projects/portfolio-img");
        return data;
      } catch (error) {
        toast(error.message, details("top-center", "❌​​"));
      }
    },
  });
  return [portfolioImg, isLoading];
};

export default getProtfolioImg;
