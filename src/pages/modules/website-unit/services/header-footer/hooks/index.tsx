import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IUnitHeaderFooterServices } from '@/pages/modules/website-unit/services/header-footer/data/types.ts'

export const UseGetHeaderFooterService = () => {
  const [serviceHeaderFooter, setServiceHeaderFooter] = useState<IUnitHeaderFooterServices[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['header-footer'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/unit/layanan-header-footer').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setServiceHeaderFooter(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { serviceHeaderFooter, loading, meta }
}
