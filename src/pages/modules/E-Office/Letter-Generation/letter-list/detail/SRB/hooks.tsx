import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISRBLetter } from './types.ts'

export const UseLetterDetailSRB = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISRBLetter>({
    queryKey: ['letter-detail-srb', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-rekomendasi-beasiswa/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
