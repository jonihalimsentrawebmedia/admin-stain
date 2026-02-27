import type { Meta } from '@/components/common/table/TablePagination'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { LandingList } from '../model'

interface Props {
  isGetAll?: boolean
}
const useGetLandingPage = (props: Props) => {
  const { isGetAll = false } = props
  const [landing, setLanding] = useState<LandingList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '1000'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: LandingList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['lppm-landing-page', ParamsSearch.toString()],
    queryFn: () => AxiosClient.get(`/lppm/landing-page?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLanding(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return {
    landing,
    loading,
    meta,
  }
}

export default useGetLandingPage
