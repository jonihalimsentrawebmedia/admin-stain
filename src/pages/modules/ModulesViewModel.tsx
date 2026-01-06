import {useState, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import AxiosClient from "@/provider/axios.tsx";
import type {IModulesList} from "@/pages/modules/interface";
import { useNavigate } from "react-router-dom";

export const ModulesViewModel = () => {
  const navigate=useNavigate()
  const [modules, setModules] = useState<IModulesList[]>([]);

  const [moduleSelect, setModuleSelect] = useState<IModulesList>()

  const {data, isLoading, isFetching} = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['modules-list'],
    queryFn: () => AxiosClient.get('/dashboard').then(res => res.data.data)
  })

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setModules(data)
    }
  }, [data]);

  function goToProfile(){

    navigate('/modules/profile')
  }

  return {
    modules,
    loading,
    moduleSelect,
    setModuleSelect,goToProfile
  };
};

