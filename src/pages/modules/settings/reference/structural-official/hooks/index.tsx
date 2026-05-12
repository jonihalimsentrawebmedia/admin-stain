import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IStructuralPosition } from '../data/types'

export const UseStructuralOfficial = (props?: BasicProps) => {
  const { page, search, limit } = props ?? {}
  const [structural, setStructural] = useState<IStructuralPosition[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['structural-official'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/pengaturan/referensi/jabatan-struktural').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStructural(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, structural, meta }
}
