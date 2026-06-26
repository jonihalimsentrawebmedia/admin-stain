import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IInformationPPID } from './types'

export const UseGetInformationPPID = () => {
  const { data, isFetching, isLoading } = useQuery<IInformationPPID>({
    queryKey: ['ppid-information'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/lppm/ppid').then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { responseData: data, loading }
}
