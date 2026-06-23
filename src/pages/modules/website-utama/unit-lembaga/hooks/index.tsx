import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetUnitInstitution = (props: BasicProps) => {
  const { search, limit, page } = props

  const Params = new URLSearchParams()
  if (page) Params.set('page', page ?? '1')
  if (limit) Params.set('limit', limit ?? '10')
  if (search) Params.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-institution', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/unit-lembaga?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return { unitInstitution: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetUnitInstitutionDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-institution-detail', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/unit-lembaga/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { unitInstitutionDetail: data, loading }
}

export const UseGetUnitInstitutionBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['unit-institution-background'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/satuan-organisasi/unit-lembaga-background`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { background: data, loading }
}
