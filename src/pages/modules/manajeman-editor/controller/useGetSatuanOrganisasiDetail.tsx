import AxiosClient from "@/provider/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams, } from "react-router-dom";
import type { SatuanOrganisasiDetail } from "../../settings/model";

interface Props {
  kelompok?: string;
}
const useGetSatuanOrganisasiDetail = ({ kelompok }: Props) => {
 
  const params = useParams();
  const { id } = params;

  const { data, isLoading, isFetching } = useQuery<SatuanOrganisasiDetail>({
    refetchOnWindowFocus: false,
    queryKey: ["editor-satuan-organisasi-list-detail", kelompok, id],
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(
        `/editor/profil/${id}`
      ).then((res) => res.data.data),
  });

  const loading = isLoading || isFetching;

  return {
    satuanOrganisasi: data,
    loading,
  };
};

export default useGetSatuanOrganisasiDetail;
