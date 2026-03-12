// pusat-karir/lowongan-pekerjaan

import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/data/types.ts'

export const UseGetListJobVacancy = () => {
  const [jobVacancy, setJobVacancy] = useState<IJobVacancy[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['job-vacancy'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/lowongan-pekerjaan').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setJobVacancy(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { jobVacancy, loading, meta }
}

export const UseGetDetailJobVacancy = (id: string) => {
  const [jobVacancy, setJobVacancy] = useState<IJobVacancy>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['job-vacancy-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/lowongan-pekerjaan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setJobVacancy(data)
    }
  }, [data])

  return { jobVacancy, loading }
}
