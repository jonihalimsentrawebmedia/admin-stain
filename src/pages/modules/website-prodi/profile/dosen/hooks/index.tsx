import { useEffect, useState } from 'react'
import type { Dosen } from '@/pages/modules/website-utama/program-studi/detail/model/dosen.ts'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { StaffProfileStatus } from '@/pages/modules/website-utama/program-studi/detail/model/staff'

export const UseGetLecturer = () => {
  const [lecturer, setLecturer] = useState<Dosen[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lecturer-profile'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/prodi/profil/dosen').then((res) => res.data),
  })

  useEffect(() => {
    if (data) {
      setLecturer(data.data)
      setMeta(data.meta)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { lecturer, loading, meta }
}

export const UseGetLecturerStatus = () => {
  const [refetchCount, setRefetchCount] = useState(0)
  const [lecturerStatus, setLecturerStatus] = useState<StaffProfileStatus>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['lecturer-profile-status'],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get('/prodi/profil/dosen/status').then((res) => {
        if (res.data.data.status === 'in_progress') {
          setRefetchCount((prev) => prev + 1)
        }
        return res.data
      }),
    refetchInterval: (query) => {
      const status = query.state.data?.data?.status

      if (status === 'in_progress' && refetchCount < 10) {
        return 10000 // 10 detik
      }

      return false // stop polling
    },
  })

  useEffect(() => {
    if (data) {
      setLecturerStatus(data.data)
    }
  }, [data])

  const loading = isLoading || isFetching

  return { lecturerStatus, loading }
}
