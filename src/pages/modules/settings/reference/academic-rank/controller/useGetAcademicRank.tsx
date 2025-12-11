import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { AcademicRankList } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'

interface props {
  isGetAll?: boolean
}

const useGetAcademicRank = (props?: props) => {
  const { isGetAll } = props ?? {}
  const [academicRank, setAcademicRank] = useState<AcademicRankList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  let ParamsSearch: URLSearchParams
  if (isGetAll) {
    ParamsSearch = new URLSearchParams({ page: '1', limit: '1000000', search })
  } else {
    ParamsSearch = new URLSearchParams({ page, limit, search })
  }

  const { data, isLoading, isFetching } = useQuery<{
    data: AcademicRankList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-academic-rank', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/pangkat-akademik?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAcademicRank(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    academicRank,
    loading,
    meta,
  }
}

export default useGetAcademicRank
