import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IBGThumbnail } from '@/pages/modules/website-utama/public-content/announcement/data'
import { useSearchParams } from 'react-router-dom'

export const UseGetInboxMessage = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-inbox-message', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pertanyaan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listMessage: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetBackgroundInboxMessage = () => {
  const { data, isLoading, isFetching } = useQuery<IBGThumbnail[]>({
    queryKey: ['background-question'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/pertanyaan-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data ?? [], loading }
}
