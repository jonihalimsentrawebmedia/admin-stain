import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

export const UseGetServiceProdi = () => {
  const [serviceProdi, setServiceProdi] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['service-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/layanan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setServiceProdi(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { serviceProdi, loading, meta }
}

export const UseGetLogServiceProdi = (id: string) => {
  const [serviceProdiLog, setServiceProdiLog] = useState<any>()
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['service-prodi-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/layanan-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setServiceProdiLog(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { serviceProdiLog, loading, meta }
}
