import { useEffect, useState } from 'react'
import type { BasicProps } from '@/utils/globalType.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { ILetterNature } from '@/pages/modules/E-Office/reference/letter-nature/data/types.ts'

export const USeGetLetterNature = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [letterNature, setLetterNature] = useState<ILetterNature[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    refetchOnWindowFocus: false,
    queryKey: ['letter-nature', Params.toString()],
    queryFn: () => AxiosClient.get('/eoffice/sifat-surat').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setLetterNature(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { loading, letterNature, meta }
}
