import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetRegisterPath = (props: BasicProps) => {
  const { page, limit, search } = props

  const params = new URLSearchParams()
  if (search) params.append('search', search)
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['register-path', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jalur-pendaftaran?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { registerPath: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetRegisterPathById = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['register-path-id', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/jalur-pendaftaran/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { registerPath: data, loading }
}
