import { useQuery } from "@tanstack/react-query";
import type { ModuleList } from "../model";
import AxiosClient from "@/provider/axios";
import { useEffect, useState } from "react";

const useGetModules = () => {
 const [modules, setModules] = useState<ModuleList[]>([]);



  const {data, isLoading, isFetching} = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['modules-list'],
    queryFn: () => AxiosClient.get('/pengaturan/modules').then(res => res.data.data)
  })

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setModules(data)
    }
  }, [data]);

  return {
    modules,
    loading,
   
  };
}

export default useGetModules