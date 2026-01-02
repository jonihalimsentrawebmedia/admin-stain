import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
interface Props {
  isGetAll?: boolean
}

const useGetProgramStudy = (props?: Props) => {
  const { isGetAll = false } = props ?? {}
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const id_fakultas_asal = searchParams.get('id_fakultas_asal') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '10000' })
    ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search,id_fakultas_asal })
  }

  const [programStudy, setProgramStudy] = useState<SatuanOrganisasiList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-program-study', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/website-utama/program-studi/satuan-organisasi/program-studi?${ParamsSearch}`).then((res) => res.data),
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

export default useGetProgramStudy
