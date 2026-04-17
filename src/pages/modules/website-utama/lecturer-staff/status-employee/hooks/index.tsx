import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/types.ts'

export const UseGetStatusEmployee = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const [status, setStatus] = useState<IStatusEmployee[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-employee', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/website-utama/sdm-status').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, status }
}
