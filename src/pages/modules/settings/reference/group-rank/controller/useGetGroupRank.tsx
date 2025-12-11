import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { GroupRankList } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'

interface props {
  isGetAll?: boolean
}

const useGetGroupRank = (props?: props) => {
  const { isGetAll = false } = props ?? {}
  const [groupRank, setGroupRank] = useState<GroupRankList[]>([])
  const [meta, setMeta] = useState<Meta>()

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

  const { data, isLoading, isFetching } = useQuery<{
    data: GroupRankList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-group-rank', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/pangkat-golongan?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGroupRank(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    groupRank,
    loading,
    meta,
  }
}

export default useGetGroupRank
