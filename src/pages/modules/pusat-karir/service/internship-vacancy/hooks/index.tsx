import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/data/types.ts'

export const UseGetListInternshipVacancy = () => {
  const [internshipVacancy, setInternshipVacancy] = useState<IJobVacancy[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['internship-vacancy'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/lowongan-magang-pekerjaan').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInternshipVacancy(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { internshipVacancy, loading, meta }
}

export const UseGetDetailInternshipVacancy = (id: string) => {
  const [internshipVacancy, setInternshipVacancy] = useState<IJobVacancy>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['internship-vacancy-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/lowongan-magang-pekerjaan/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setInternshipVacancy(data)
    }
  }, [data])

  return { internshipVacancy, loading }
}
