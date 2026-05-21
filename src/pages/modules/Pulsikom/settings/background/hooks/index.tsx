import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQuery } from '@tanstack/react-query'
import type { IBackground } from '../data/types.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export type Context =
  | 'TENTANG_KAMI'
  | 'LAYANAN'
  | 'PRODUK'
  | 'TRAINING'
  | 'INFORMASI'
  | 'HUBUNGI_KAMI'

interface props extends BasicProps {
  context: Context
}

export const UseGetListBackground = (props: props) => {
  const { context, search, page, limit } = props

  const [background, setBackground] = useState<IBackground[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['background-pusilkom', context, ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/pusilkom/background/${context}?${ParamsSearch}`).then((res) => res.data),
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
