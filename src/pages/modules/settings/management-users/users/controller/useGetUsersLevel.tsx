import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import type { UserMultiLevelList } from "../model/leveluser";
interface Props{
    id:string
}
const useGetUsersLevel = ({id}:Props) => {
const [userMulti, setUserMulti] = useState<UserMultiLevelList[]>([]);



  const {data, isLoading, isFetching} = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users-list-multi'+id],
    queryFn: () => AxiosClient.get(`/pengaturan/manajemen-user/users/multi-level/by-user/${id}`).then(res => res.data.data)
  })

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setUserMulti(data)
    }
  }, [data]);

  return {
    userMulti,
    loading,
   
  };
}

export default useGetUsersLevel