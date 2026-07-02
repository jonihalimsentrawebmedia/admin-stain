import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISPMLetter } from './types.ts'

export const UseLetterDetailSPM = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISPMLetter>({
    queryKey: ['letter-detail-spm'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-permohonan-magang/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
