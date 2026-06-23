import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { LevelUserList } from "../model";
import AxiosClient from "@/provider/axios";

const useGetLevelUserId = () => {
  const param = useParams();
  const { id } = param;

  const { data, isLoading, isFetching } = useQuery<{
    data: LevelUserList;
  }>({
    queryKey: ["level-user", { id}],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/manajemen-user/level-users/${id}`, {}).then(
        (res) => res?.data
      ),
    refetchOnWindowFocus: false,
  });

  const loading = isLoading || isFetching;

  return {
    loading,
    levelUser: data?.data,
  };
};

export default useGetLevelUserId;
