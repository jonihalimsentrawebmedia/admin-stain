import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPejabat } from '@/pages/modules/E-Office/official-travel/pejabat/data/types.ts'

export const USeGetPejabat = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [pejabat, setPejabat] = useState<IPejabat[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['pejabat', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/pejabat?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPejabat(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, pejabat, meta }
}
