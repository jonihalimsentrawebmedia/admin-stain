import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { ISatuanOrganisasi } from "./useGetSatuanOrganisasiPengajuan";
import { useQuery } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";

const useGetSatuanOrganisasiDetailHistory = () => {
 const params = useParams();
  const { id ,idHistory} = params;
  const [satuanOrganisasi, setSatuanOrganisasi] =
    useState<ISatuanOrganisasi>();

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["editor-satuan-organisasi-list-detail-history",  ],
    queryFn: () =>
      AxiosClient.get(
        `/editor/profil-history/${id}/${idHistory}`
      ).then((res) => res.data.data),
  });

  const loading = isLoading || isFetching;

  useEffect(() => {
    if (data) {
      setSatuanOrganisasi(data);
    }
  }, [data]);

  return {
    satuanOrganisasi,
    loading,
  };
}

export default useGetSatuanOrganisasiDetailHistory