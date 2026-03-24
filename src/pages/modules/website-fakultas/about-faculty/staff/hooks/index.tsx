import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'

export const UseGetStaffFaculty = (props?: BasicProps) => {
  const { search, limit, page } = props ?? {}

  const [staff, setStaff] = useState<[]>([])
  const [meta, setMeta] = useState<Meta>()

  const Params = new URLSearchParams()
  if (page) Params.append('page', page ?? '1')
  if (limit) Params.append('limit', limit ?? '10')
  if (search) Params.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['staff-faculty', Params.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/fakultas/profil/staff`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setStaff(data.data)
      setMeta(data.meta)
    }
  }, [data])

  return { staff, loading, meta }
}
