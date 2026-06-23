import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export const UseGetListFAQ = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const Params = new URLSearchParams()
  if (search) Params.append('search', search)
  if (limit) Params.append('limit', limit)
  if (page) Params.append('page', page)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['list-faq', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/faqs?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listFaq: data?.data ?? [], loading, metta: data?.meta }
}
