import { useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'

const useGetContent = () => {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search= searchParams.get('search') ?? ''

  const id_menu = id ?? searchParams.get('id_menu') ?? ''
  const ParamsSearch = new URLSearchParams({ page, limit, id_menu,search })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-contents', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/konten?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { contentList: data?.data ?? [], loading, meta: data?.meta }
}

export default useGetContent
