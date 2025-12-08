import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { GroupRankList } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'

const useGetGroupRank = () => {
  const [searchParams] = useSearchParams()
  const [meta, setMeta] = useState<Meta>()
  const [groupRank, setGroupRank] = useState<GroupRankList[]>([])
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const { data, isLoading, isFetching } = useQuery<{
    data: GroupRankList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-group-rank', { page, limit, search }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/pangkat-golongan?${searchParams.toString()}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setGroupRank(data.data??[])
      setMeta(data.meta)
    }
  }, [data])

  return {
    groupRank,
    loading,meta
  }
}

export default useGetGroupRank
