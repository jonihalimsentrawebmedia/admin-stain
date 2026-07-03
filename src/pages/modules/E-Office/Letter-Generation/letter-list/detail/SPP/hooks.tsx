import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ISPPLetter } from './types.ts'

export const UseLetterDetailSPP = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISPPLetter>({
    queryKey: ['letter-detail-spp', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-pengantar-penelitian/${id}`).then(
        (res) => res.data.data
      ),
  })

  const loading = isLoading || isFetching

  return { letter: data, loading }
}
