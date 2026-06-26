import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IProcedureText } from './types.tsx'

export const UseGetProcedureJobseeker = () => {
  const { data, isFetching, isLoading } = useQuery<IProcedureText>({
    queryKey: ['procedure-job-seeker'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/pusat-karir/prosedur-pendaftaran-pencari-kerja').then(
        (res) => res.data?.data
      ),
  })

  const loading = isLoading || isFetching

  return { procedure: data, loading }
}
