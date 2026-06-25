import type { SatuanOrganisasiList } from "@/pages/modules/settings/model"
import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"

const useGetUnitCurrent = () => {
  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList
    
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['unit-ppid-current'],
    queryFn: () => AxiosClient.get(`/unit-ppid/profil/current`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    unitCurrent: data?.data,
    loading,
  }
}

export default useGetUnitCurrent