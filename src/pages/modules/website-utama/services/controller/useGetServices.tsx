import  { useEffect, useState } from 'react'
import type { ServicesList } from '../model'
import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetServices = () => {
  const [serviceList, setServiceList] = useState<ServicesList[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-services', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/layanan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setServiceList(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { serviceList, loading, meta }
}

export default useGetServices
