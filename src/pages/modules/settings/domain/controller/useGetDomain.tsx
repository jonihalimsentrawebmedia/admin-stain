import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import type { DomainList } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import AxiosClient from '@/provider/axios'

const useGetDomain = () => {
  const [searchParams] = useSearchParams()
  const [domains, setDomains] = useState<DomainList[]>([])
  const [meta, setMeta] = useState<Meta>()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''
  const { data, isLoading, isFetching } = useQuery<{
    data: DomainList[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['settings-domain', { page, limit, search }],
    queryFn: () =>
      AxiosClient.get(`/pengaturan/domains?${searchParams.toString()}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDomains(data.data??[])
      setMeta(data.meta)
    }
  }, [data])

  return {
    domains,
    loading,
    meta,
  }
}

export default useGetDomain
