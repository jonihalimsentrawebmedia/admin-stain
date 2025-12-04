import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { DashboardList } from "../model";
import type { Meta } from "@/components/common/table/TablePagination";
import AxiosClient from "@/provider/axios";

const useGetDashboard = () => {
  const [dashboard, setDashboard] = useState<DashboardList[]>([]);

  const { data, isLoading, isFetching } = useQuery<{
    data: DashboardList[];
    meta: Meta;
  }>({
    refetchOnWindowFocus: false,
    queryKey: ["dashboard"],
    queryFn: () => AxiosClient.get("/dashboard").then((res) => res.data),
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setDashboard(data.data);
    }
  }, [data]);

  return {
    dashboard,
    loading,
  };
};

export default useGetDashboard;
