import { useQuery } from "@tanstack/react-query"
import type { SatuanOrganisasiLanguage } from "../model"
import AxiosClient from "@/provider/axios"

export const UseSatuanOrganisasiLanguage = (id?: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    id: SatuanOrganisasiLanguage
    en: SatuanOrganisasiLanguage
    zh: SatuanOrganisasiLanguage
    ar: SatuanOrganisasiLanguage
  }>({
    queryKey: ['satuan-organisasi-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/satuan-organisasi-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { loading, language: data }
}