import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IAccreditation } from '../data/types.ts'

export const UseGetAccreditation = () => {
  const [accreditation, setAccreditation] = useState<IAccreditation[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['accreditation-faculty'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/fakultas/akreditas').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAccreditation(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { accreditation, meta, loading }
}
