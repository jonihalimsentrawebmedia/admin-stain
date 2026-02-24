import type { SatuanOrganisasiList } from "@/pages/modules/settings/model"
import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"

const useGetUnitCurrent = () => {
  const [unitCurrent, setUnitCurrent] = useState<SatuanOrganisasiList>()

  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList
   
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['unit-ppid-current'],
    queryFn: () => AxiosClient.get(`/unit-ppid/profil/current`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setUnitCurrent(data.data)
    }
  }, [data])

  return {
    unitCurrent,
    loading,
  }
}

export default useGetUnitCurrent