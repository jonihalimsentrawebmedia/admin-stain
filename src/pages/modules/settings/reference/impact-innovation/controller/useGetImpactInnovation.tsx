import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { InovationList } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'

interface Props {
  isGetAll?: boolean
}

const useGetImpactInnovation = (props?: Props) => {
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

  const [impactInnovation, setImpactInnovation] = useState<InovationList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery<{
    data: InovationList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-impact-innovation', ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/referensi/inovasi-berdampak?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setImpactInnovation(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    impactInnovation,
    loading,
    meta,
  }
}

export default useGetImpactInnovation
