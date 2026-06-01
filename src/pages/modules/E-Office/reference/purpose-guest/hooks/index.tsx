import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IPurposeGuest } from '../data/types.ts'

export const UseGetPurposeGuest = (props: BasicProps) => {
  const { page, limit, search } = props
  const [purposeGuest, setPurposeGuest] = useState<IPurposeGuest[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['purpose-guest', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/eoffice/tujuan-bertamu?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setPurposeGuest(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, purposeGuest, meta }
}
