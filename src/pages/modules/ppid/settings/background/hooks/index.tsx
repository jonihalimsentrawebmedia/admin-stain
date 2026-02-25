// unit-ppid/background/:context

import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQuery } from '@tanstack/react-query'
import type { IBackgroundPPID } from '@/pages/modules/ppid/settings/background/data/types.tsx'

export type Context =
  | 'PROFILE'
  | 'INFORMASI_PUBLIC'
  | 'REGULASI'
  | 'FORMULIR_PERMOHONAN'
  | 'LAPORAN'
  | 'HUBUNGI_KAMI'

export const UseGetListBackground = (context: Context) => {
  const [background, setBackground] = useState<IBackgroundPPID[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['background-unit-ppid', context],
    queryFn: () => AxiosClient.get(`/unit-ppid/background/${context}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setBackground(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { background, loading, meta }
}
