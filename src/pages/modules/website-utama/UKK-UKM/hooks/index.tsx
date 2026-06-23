import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const USeGetUkkUkm = (props: BasicProps) => {
  const { search, limit, page } = props

  const params = new URLSearchParams()
  if (page) params.append('page', page ?? '1')
  if (limit) params.append('limit', limit ?? '10')
  if (search) params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ukk_ukm', params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/ukk-ukm?${params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { meta: data?.meta, loading, ukkUkm: data?.data }
}

export const UseGetUkkUkmDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ukk_ukm', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/website-utama/ukk-ukm/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { ukkUkm: data, loading }
}

export const UseGetUkkUkmBackground = () => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['ukk-ukm-background'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/website-utama/ukk-ukm-background`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { background: data, loading }
}
