import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDescription } from './types.tsx'

export const UseGetDetailUndergraduate = () => {
  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['undergraduate-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/fakultas/deskripsi-international-ungreaduate-program').then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { description: data as IDescription | undefined, loading }
}
