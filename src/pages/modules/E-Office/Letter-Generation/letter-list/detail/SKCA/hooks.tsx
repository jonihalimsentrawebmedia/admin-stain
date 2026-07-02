import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISKCALetter } from './types.ts'

export const UseLetterDetailSKCA = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISKCALetter>({
    queryKey: ['letter-detail-skca'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-keterangan-cuti-akademik/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
