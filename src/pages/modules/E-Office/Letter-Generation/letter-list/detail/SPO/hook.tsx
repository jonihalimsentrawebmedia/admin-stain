import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISPOLetter } from './types.ts'

export const UseLetterDetailSPO = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISPOLetter>({
    queryKey: ['letter-detail-spo', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-pengantar-observasi/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
