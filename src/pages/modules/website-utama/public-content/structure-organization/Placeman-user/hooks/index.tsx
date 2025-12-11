import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPlacemanUser } from '../data/index'

export const UseGetPlacemanUser = () => {
  const [listUserPlaceman, setListUserPlaceman] = useState<IPlacemanUser[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search')

  const ParamsSearch = new URLSearchParams({ page, limit })
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-placeman', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pejabat?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setListUserPlaceman(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { listUserPlaceman, loading, meta }
}
