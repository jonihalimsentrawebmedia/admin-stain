import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAdvantage } from '@/pages/modules/Pulsikom/advantage/data/types.ts'

export const UseGetAdvantage = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [advantage, setAdvantage] = useState<IAdvantage[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.set('page', page ?? '')
  if (limit) ParamsSearch.set('limit', limit ?? '')
  if (search) ParamsSearch.set('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['advantage', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/keunggulan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMeta(data.meta)
      setAdvantage(data?.data)
    }
  }, [data])

  return { advantage, loading, meta }
}

export const UseGetAdvantageDetail = (id: string) => {
  const [detail, setDetail] = useState<IAdvantage>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-advantage', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/pusilkom/keunggulan/${id}`).then((res) => res.data.data),
  })
  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
