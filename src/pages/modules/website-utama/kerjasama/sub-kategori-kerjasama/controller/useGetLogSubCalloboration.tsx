import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetLogSubCalloboration = () => {
  const { idSubCalloborationCategory } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['log-list-sub-calloboration-log', idSubCalloborationCategory, ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    enabled: !!idSubCalloborationCategory,
    queryFn: () =>
      AxiosClient.get(
        `/website-utama/sub-kategori-kerjasama-log/${idSubCalloborationCategory}?${ParamsSearch}`
      ).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { log: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetLogSubCalloboration
