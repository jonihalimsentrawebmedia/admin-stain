import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IResponseReportLetter } from '../data/types.ts'

export const UseGetReportAssignment = (id: string) => {
  const [letterAssignment, setLetterAssignment] = useState<IResponseReportLetter>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['report-assignment', id],
    queryFn: () =>
      AxiosClient.get(`/eoffice/mail-surat-tugas/${id}/laporan`).then((res) => res.data.data),
    refetchOnWindowFocus: false,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLetterAssignment(data)
    }
  }, [data])

  return { letterAssignment, loading }
}
