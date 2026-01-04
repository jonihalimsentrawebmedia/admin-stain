import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { SatuanOrganisasiList } from '@/pages/modules/settings/model'
interface Props {
  isGetAll?: boolean
}

const useGetFaculty = (props?: Props) => {
  const { isGetAll = false } = props ?? {}
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '10000' })
    ParamsSearch.append('search', search)
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search })
  }

  const [faculty, setFaculty] = useState<SatuanOrganisasiList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: SatuanOrganisasiList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['list-faculty', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(
        `/website-utama/program-studi/satuan-organisasi/fakultas?${ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setFaculty(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    faculty,
    loading,
    meta,
  }
}

export default useGetFaculty
