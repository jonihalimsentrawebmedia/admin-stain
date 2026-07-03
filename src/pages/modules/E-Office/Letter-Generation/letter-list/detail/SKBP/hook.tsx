// ISKBPLetter

import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISKBPLetter } from './types.ts'

export const UseLetterDetailSKBP = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISKBPLetter>({
    queryKey: ['letter-detail-skbp', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-bebas-pustaka/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
