import  { useEffect, useState } from "react";
import type { LevelUserList } from "../model";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AxiosClient from "@/provider/axios";

const useGetLevelUserId = () => {
  const param = useParams();
  const { id } = param;
  const [levelUser, setLeveluser] = useState<LevelUserList>();

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

  useEffect(() => {
    if (data) {
      setLeveluser(data?.data);
    }
  }, [data]);

  return {
    loading,
    levelUser,
  };
};

export default useGetLevelUserId;
