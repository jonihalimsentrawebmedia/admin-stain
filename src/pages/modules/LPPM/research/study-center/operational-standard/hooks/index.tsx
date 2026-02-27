import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IStandardOperational } from '../data/types'
import type { basicProps } from '@/pages/modules/LPPM/hooks/types.ts'

export const UseGetDocumentStandardOperational = (props: basicProps) => {
  const { search, page, limit } = props
  const [document, setDocument] = useState<IStandardOperational[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['standard-operational', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/lppm/standard-operasional-pusat-studi?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDocument(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { document, meta, loading }
}
