import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import Cookies from 'js-cookie'

export const UseGetListGuide = () => {
  const valueGuide = Cookies.get('guide')
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`list-guide-${valueGuide}`],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/panduan/${valueGuide}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { listGuide: data?.data ?? [], loading, meta: data?.meta }
}
