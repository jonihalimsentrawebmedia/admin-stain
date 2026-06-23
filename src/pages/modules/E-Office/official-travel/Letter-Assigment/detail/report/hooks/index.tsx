import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IResponseReportLetter } from '../data/types.ts'

export const UseGetReportAssignment = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IResponseReportLetter>({
    queryKey: ['report-assignment', id],
    enabled: !!id,
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-tugas/${id}/laporan`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  return { letterAssignment: data, loading }
}
