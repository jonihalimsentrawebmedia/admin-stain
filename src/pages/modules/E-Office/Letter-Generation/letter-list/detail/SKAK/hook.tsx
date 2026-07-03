import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISKAKLetter } from './types.ts'

export const UseLetterDetailSKAK = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISKAKLetter>({
    queryKey: ['letter-detail-skak', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-keterangan-aktif-kembali/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
