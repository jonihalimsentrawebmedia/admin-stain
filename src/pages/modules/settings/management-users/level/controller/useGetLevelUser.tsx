import { useSearchParams } from "react-router-dom";
import type { LevelUserList } from "../model";
import { useQuery } from "@tanstack/react-query";
import type { Meta } from "@/components/common/table/TablePagination";
import AxiosClient from "@/provider/axios";
import { useEffect, useState } from "react";

const useGetLevelUser = () => {
  const [searchParams] = useSearchParams();
  const [levelUser, setLevelUser] = useState<LevelUserList[]>([]);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const search = searchParams.get("search") || "";
  const { data, isLoading, isFetching } = useQuery<{
    data: LevelUserList[];
    meta: Meta;
  }>({
    refetchOnWindowFocus: false,
    queryKey: ["settings-level-users", { page, limit, search }],
    queryFn: () =>
      AxiosClient.get("/pengaturan/manajemen-user/level-users").then(
        (res) => res.data
      ),
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setLevelUser(data.data);
    }
  }, [data]);

  return {
    levelUser,
    loading,
  };
};

export default useGetLevelUser;
