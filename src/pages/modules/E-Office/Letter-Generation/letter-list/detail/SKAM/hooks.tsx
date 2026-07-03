import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISKAMLettter } from './types.ts'

export const UseLetterDetailSKAM = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISKAMLettter>({
    queryKey: ['letter-detail-skam', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-keterangan-aktif-mahasiswa/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
