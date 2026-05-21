import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IStaff } from '@/pages/modules/website-fakultas/academic/program-studi/detail/staff/data/types.ts'

interface StaffProps extends BasicProps {
  id_unit: string
}

export const UseGetStaff = (props: StaffProps) => {
  const { search, limit, page, id_unit } = props

  const [staff, setStaff] = useState<IStaff[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['staff-faculty', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/satuan-organisasi/${id_unit}/staff?${Params}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStaff(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { staff, loading, meta }
}
