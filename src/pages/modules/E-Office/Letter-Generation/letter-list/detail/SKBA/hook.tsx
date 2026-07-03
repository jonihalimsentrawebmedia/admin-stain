import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISKBALetter } from './types.ts'

export const UseLetterDetailSKBA = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISKBALetter>({
    queryKey: ['letter-detail-skba', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-bebas-akademik/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
