import { useQuery } from "@tanstack/react-query";
import type { DashboardList } from "../model";
import type { Meta } from "@/components/common/table/TablePagination";
import AxiosClient from "@/provider/axios";

const useGetDashboard = () => {
  const { data, isLoading, isFetching } = useQuery<{
    data: DashboardList[];
    meta: Meta;
  }>({
    refetchOnWindowFocus: false,
    queryKey: ["dashboard"],
    queryFn: () => AxiosClient.get("/pengaturan/dashboard").then((res) => res.data),
  });

  const loading = isLoading || isFetching;

  return {
    dashboard: data?.data ?? [],
    loading,
  };
};

export default useGetDashboard;
