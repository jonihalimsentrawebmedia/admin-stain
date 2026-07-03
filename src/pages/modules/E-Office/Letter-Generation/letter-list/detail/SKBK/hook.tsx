import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISKBKLetter } from './types.ts'

export const UseLetterDetailSKBK = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISKBKLetter>({
    queryKey: ['letter-detail-skbk', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-bebas-keuangan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
