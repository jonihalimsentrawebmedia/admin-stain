import  { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { AcademicRankList } from "../model";
import { useQuery } from "@tanstack/react-query";
import type { Meta } from "@/components/common/table/TablePagination";
import AxiosClient from "@/provider/axios";

const useGetAcademicRank = () => {
  const [searchParams] = useSearchParams();
  const [academicRank, setAcademicRank] = useState<AcademicRankList[]>([]);
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const search = searchParams.get("search") || "";
  const { data, isLoading, isFetching } = useQuery<{
    data: AcademicRankList[];
    meta: Meta;
  }>({
    refetchOnWindowFocus: false,
    queryKey: ["settings-academic-rank", { page, limit, search }],
    queryFn: () =>
      AxiosClient.get("/pengaturan/referensi/pangkat-akademik").then(
        (res) => res.data
      ),
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setAcademicRank(data.data);
    }
  }, [data]);

  return {
    academicRank,
    loading,
  };
};

export default useGetAcademicRank;
