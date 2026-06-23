import type { Meta } from "@/components/common/table/TablePagination"
import type { SatuanOrganisasiList } from "@/pages/modules/settings/model"
import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"



const useGetListFakultas = () => {
  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-program-study-fakultas',],
    queryFn: () =>
      AxiosClient.get(`/website-utama/program-studi/satuan-organisasi/fakultas`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    programStudy: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetListFakultas