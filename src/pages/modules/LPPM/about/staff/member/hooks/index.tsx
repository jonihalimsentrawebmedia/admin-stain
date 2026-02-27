import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IMemberStaff } from '@/pages/modules/LPPM/about/staff/member/hooks/types.ts'

interface Props {
  page?: string
  limit?: string
  search?: string
  id_staff: string
}

export const UseGetMemberStaff = (props?: Props) => {
  const { page, limit, search, id_staff } = props ?? {}
  const [member, setMember] = useState<IMemberStaff[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '0')
  if (search) ParamsSearch.append('search', search ?? '')
  if (id_staff) ParamsSearch.append('id_staff', id_staff ?? '')

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['member-staff', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/lppm/staff-anggota?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setMember(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { member, loading, meta }
}

export const UseGetMemberDetail = (id: string) => {
  const [detail, setDetail] = useState<IMemberStaff>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['member-staff-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient(`/lppm/staff-anggota/${id}`).then((res) => res?.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
