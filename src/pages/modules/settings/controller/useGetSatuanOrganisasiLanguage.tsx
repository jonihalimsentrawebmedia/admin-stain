import { useEffect, useState } from "react"
import type { SatuanOrganisasiLanguage } from "../model"
import { useQuery } from "@tanstack/react-query"
import AxiosClient from "@/provider/axios"

export const UseSatuanOrganisasiLanguage = (id?: string) => {
  const [language, setLanguage] = useState<{
    id: SatuanOrganisasiLanguage
    en: SatuanOrganisasiLanguage
    zh: SatuanOrganisasiLanguage
    ar: SatuanOrganisasiLanguage
  }>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['satuan-organisasi-language', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pengaturan/satuan-organisasi-translate/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanguage(data)
    }
  }, [data])

  return { loading, language }
}