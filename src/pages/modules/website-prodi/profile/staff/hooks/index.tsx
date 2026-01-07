import { useEffect, useState } from 'react'
import type { StaffProfile } from '@/pages/modules/website-utama/program-studi/detail/model/staff.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import { useSearchParams } from 'react-router-dom'

export const UseGetStaffProfileProdi = () => {
  const [staff, setStaff] = useState<StaffProfile[]>([])
  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'

  const ParamsSearch = new URLSearchParams({ page, limit })

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['staff-profile', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/profil/staff?${ParamsSearch}`).then((res) => res.data),
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
