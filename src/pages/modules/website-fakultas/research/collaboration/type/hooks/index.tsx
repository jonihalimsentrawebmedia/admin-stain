import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { TypeCollaboration } from '../data/types.ts'

export const UseGetTypeCollaboration = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const [typeCollaboration, setTypeCollaboration] = useState<TypeCollaboration[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (search) Params.set('search', search ?? '')
  if (page) Params.set('page', page ?? '0')
  if (limit) Params.set('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['type-collaboration', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/bidang-kolaborasi?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setTypeCollaboration(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { typeCollaboration, loading, meta }
}
