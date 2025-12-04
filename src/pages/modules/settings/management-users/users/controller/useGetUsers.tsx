import { useEffect, useState } from "react";
import type { UserList } from "../model";
import { useQuery } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";

const useGetUsers = () => {
const [users, setUsers] = useState<UserList[]>([]);



  const {data, isLoading, isFetching} = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['users-list'],
    queryFn: () => AxiosClient.get('/pengaturan/manajemen-user/users').then(res => res.data.data)
  })

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data]);

  return {
    users,
    loading,
   
  };
}

export default useGetUsers