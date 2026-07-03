import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISPKLetter } from './types.ts'

export const UseLetterDetailSPK = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISPKLetter>({
    queryKey: ['letter-detail-spk',id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-pengantar-kkn/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
