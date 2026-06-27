import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'

interface IServiceLog {
  id: string
  [key: string]: unknown
}

export const UseGetServiceProdi = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{ data: unknown[]; meta: Meta }>({
    queryKey: ['service-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/layanan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { serviceProdi: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetLogServiceProdi = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: IServiceLog[]; meta: Meta }>({
    queryKey: ['service-prodi-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/layanan-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { serviceProdiLog: data?.data ?? [], loading, meta: data?.meta }
}
