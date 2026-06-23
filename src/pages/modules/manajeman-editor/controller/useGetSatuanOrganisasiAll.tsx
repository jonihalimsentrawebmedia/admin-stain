import { useQuery } from "@tanstack/react-query";
import AxiosClient from "@/provider/axios";
import type { SatuanOrganisasiList } from "../../settings/model";



const useGetSatuanOrganisasiAll = () => {
 

  const { data, isLoading, isFetching } = useQuery<{ data: SatuanOrganisasiList[] }>({
    refetchOnWindowFocus: false,
    queryKey: ["satuan-organisasi-list",],
    queryFn: () =>
      AxiosClient.get(
        `/pengaturan/satuan-organisasi?limit=10000`
      ).then((res) => res.data),
  });

  const loading = isLoading || isFetching;

  return {
    satuanOrganisasi: data?.data ?? [],
    loading,
  };
};

export default useGetSatuanOrganisasiAll;
