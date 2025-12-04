import AxiosClient from "@/provider/axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams,  } from "react-router-dom";
import type { SatuanOrganisasiDetail } from "../model";

interface Props {
  kelompok?: string;
}
const useGetSatuanOrganisasiDetail = ({ kelompok }: Props) => {
 
  const params = useParams();
  const { id } = params;
  const [satuanOrganisasi, setSatuanOrganisasi] =
    useState<SatuanOrganisasiDetail>();

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ["satuan-organisasi-list-detail", kelompok, ],
    queryFn: () =>
      AxiosClient.get(
        `/pengaturan/satuan-organisasi/${
          kelompok ?? ""
        }/${id}`
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
};

export default useGetSatuanOrganisasiDetail;
