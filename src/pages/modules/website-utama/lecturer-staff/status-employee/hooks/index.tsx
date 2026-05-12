import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStatusEmployee } from '@/pages/modules/website-utama/lecturer-staff/status-employee/data/types.ts'

interface Props extends BasicProps {
  filter?: 'DOSEN' | 'STAFF' | string
}

export const UseGetStatusEmployee = (props?: Props) => {
  const { page, limit, search, filter } = props ?? {}

  const [status, setStatus] = useState<IStatusEmployee[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')
  if (filter) Params.append('filter', filter ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['status-employee', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/website-utama/sdm-status?${Params}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStatus(data?.data ?? [])
      setMeta(data?.meta)
    }
  }, [data])

  return { meta, loading, status }
}
