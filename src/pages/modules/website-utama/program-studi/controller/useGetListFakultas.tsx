import type { Meta } from "@/components/common/table/TablePagination"
import type { SatuanOrganisasiList } from "@/pages/modules/settings/model"
import AxiosClient from "@/provider/axios"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


const useGetListFakultas = () => {
   const [programStudy, setProgramStudy] = useState<SatuanOrganisasiList[]>([])
  const [meta, setMeta] = useState<Meta>()

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

  useEffect(() => {
    if (data) {
      setProgramStudy(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    programStudy,
    loading,
    meta,
  }
}

export default useGetListFakultas