import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { BasicProps } from '@/utils/globalType.ts'

const useGetManagementUnit = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const { id } = useParams()

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '1')
  if (limit) Params.set('limit', limit ?? '10')
  if (search) Params.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['program-studi-management-unit', id, Params.toString()],
    enabled: !!id,
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/${id}/unit-pengelola?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { managementUnit: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetManagementUnit
