import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { IGroupStaff } from '@/pages/modules/LPPM/about/staff/hooks/types.ts'

interface Prop {
  page?: string
  limit?: string
  search?: string
}

export const UseGetStaff = (props?: Prop) => {
  const { page, limit, search } = props ?? {}
  const [staff, setStaff] = useState<IGroupStaff[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-staff', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/staff?${ParamsSearch}`).then((res) => res.data),
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

export const UseGetStaffDetail = (id: string) => {
  const [detail, setDetail] = useState<IGroupStaff>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['about-staff-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/staff/${id}`).then((res) => res?.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
