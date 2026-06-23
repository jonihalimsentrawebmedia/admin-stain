// eoffice/cetak-daftar-hadir/{{id_acara}}

import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { PrintAttendance } from '@/pages/modules/E-Office/event-activity/event-data/printAttendance/data/types.ts'

export const UseGetPrintAttendance = (id_acara: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: PrintAttendance }>({
    queryKey: ['attendance', id_acara],
    refetchOnWindowFocus: false,
    enabled: !!id_acara,
    queryFn: () =>
      AxiosClient.get(`/eoffice/cetak-daftar-hadir/${id_acara}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { loading, attendance: data?.data }
}
