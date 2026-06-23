import { useQuery } from "@tanstack/react-query";
import type { UserMultiLevelList } from "../model/leveluser";
import AxiosClient from "@/provider/axios";

interface Props{
    id:string
}
const useGetUsersLevel = ({id}:Props) => {
  const {data, isLoading, isFetching} = useQuery<UserMultiLevelList[]>({
    refetchOnWindowFocus: false,
    queryKey: ['users-list-multi'+id],
    queryFn: () => AxiosClient.get(`/pengaturan/manajemen-user/users/multi-level/by-user/${id}`).then(res => res.data.data)
  })

  const loading = isLoading || isFetching;

  return {
    userMulti: data,
    loading,
  };
}

export default useGetUsersLevel