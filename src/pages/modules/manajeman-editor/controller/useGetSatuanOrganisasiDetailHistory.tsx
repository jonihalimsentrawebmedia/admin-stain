import { useParams } from "react-router-dom";
import type { ISatuanOrganisasi } from "./useGetSatuanOrganisasiPengajuan";
import { useQuery } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";

const useGetSatuanOrganisasiDetailHistory = () => {
 const params = useParams();
  const { id ,idHistory} = params;

  const { data, isLoading, isFetching } = useQuery<ISatuanOrganisasi>({
    refetchOnWindowFocus: false,
    queryKey: ["editor-satuan-organisasi-list-detail-history", id, idHistory],
    enabled: !!id && !!idHistory,
    queryFn: () =>
      AxiosClient.get(
        `/editor/profil-history/${id}/${idHistory}`
      ).then((res) => res.data.data),
  });

  const loading = isLoading || isFetching;

  return {
    satuanOrganisasi: data,
    loading,
  };
}

export default useGetSatuanOrganisasiDetailHistory
