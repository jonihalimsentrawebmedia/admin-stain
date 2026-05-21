import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import AxiosClient from '@/provider/axios.tsx'
import { useQuery } from '@tanstack/react-query'
import type { IBackground } from '../data/types.tsx'
import type { BasicProps } from '@/utils/globalType.ts'

export type Context =
  | 'TENTANG_KAMI'
  | 'LAYANAN'
  | 'JAMINAN_MUTU'
  | 'PERATURAN'
  | 'INFORMASI'
  | 'HUBUNGI_KAMI'

interface IProps extends BasicProps {
  context: Context
}

export const UseGetListBackground = (props: IProps) => {
  const { context, page, limit, search } = props
  const [background, setBackground] = useState<IBackground[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['background-spi', context, ParamsSearch.toString()],
    queryFn: () =>
      AxiosClient.get(`/spi/background/${context}?${ParamsSearch}`).then((res) => res.data),
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
