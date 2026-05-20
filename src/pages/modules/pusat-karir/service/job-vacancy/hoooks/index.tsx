// pusat-karir/lowongan-pekerjaan

import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IJobVacancy } from '@/pages/modules/pusat-karir/service/job-vacancy/data/types.ts'
import type { BasicProps } from '@/utils/globalType.ts'

interface Props extends BasicProps {
  jenis_pekerjaan: 'FULLTIME' | 'PARTTIME' | 'FREELANCE' | 'CONTRACT' | 'MAGANG'
}

export const UseGetListJobVacancy = (props?: Props) => {
  const { search, page, limit, jenis_pekerjaan } = props ?? {}

  const [jobVacancy, setJobVacancy] = useState<IJobVacancy[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search)
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (jenis_pekerjaan) ParamsSearch.append('jenis_pekerjaan', jenis_pekerjaan)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['job-vacancy', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/lowongan-pekerjaan?${ParamsSearch}`).then((res) => res.data),
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
