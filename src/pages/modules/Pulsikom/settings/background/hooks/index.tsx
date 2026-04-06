import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQuery } from '@tanstack/react-query'
import type { IBackground } from '../data/types.tsx'

export type Context =
  | 'TENTANG_KAMI'
  | 'LAYANAN'
  | 'PRODUK'
  | 'TRAINING'
  | 'INFORMASI'
  | 'HUBUNGI_KAMI'

export const UseGetListBackground = (context: Context) => {
  const [background, setBackground] = useState<IBackground[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['background-pusilkom', context],
    queryFn: () => AxiosClient.get(`/pusilkom/background/${context}`).then((res) => res.data),
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
