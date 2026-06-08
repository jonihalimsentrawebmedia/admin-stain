// eoffice/cetak-daftar-hadir/{{id_acara}}

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { PrintAttendance } from '@/pages/modules/E-Office/event-activity/event-data/printAttendance/data/types.ts'

export const UseGetPrintAttendance = (id_acara: string) => {
  const [attendance, setAttendance] = useState<PrintAttendance>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['attendance', id_acara],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/eoffice/cetak-daftar-hadir/${id_acara}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAttendance(data.data)
    }
  }, [data])

  return { loading, attendance }
}
