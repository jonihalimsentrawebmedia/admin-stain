import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IReligion } from '../data/types.ts'

export const UseGetReligion = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [religion, setReligion] = useState<IReligion[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['religion', Params.toString()],
    queryFn: () => AxiosClient.get(`/eoffice/mahasiswa/agama?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setReligion(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, religion, meta }
}
