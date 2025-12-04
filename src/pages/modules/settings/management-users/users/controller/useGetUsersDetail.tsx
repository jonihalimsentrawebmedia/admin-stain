import AxiosClient from "@/provider/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { UserDetail,  } from "../model";

const useGetUsersDetail = () => {
  const params = useParams();
  const { id } = params;
  const [user, setUser] = useState<UserDetail>();

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["users-detail"],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/manajemen-user/users/${id}`).then(
        (res) => res.data.data
      ),
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data]);

  return {
    user,
    loading,
  };
};

export default useGetUsersDetail;
