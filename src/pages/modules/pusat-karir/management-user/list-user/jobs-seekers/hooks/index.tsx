import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IDetailJobSeeker, IShortJobSeeker } from '../data/types'

export const UseGetJobsSeekers = () => {
  const [jobSeekers, setJobSeekers] = useState<IShortJobSeeker[]>([])
  const [meta, setMeta] = useState<Meta>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['jobs-seekers'],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get('/pusat-karir/pencari-kerja').then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setJobSeekers(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { jobSeekers, meta, loading }
}

export const UseGetDetailJobsSeekers = (id: string) => {
  const [detail, setDetail] = useState<IDetailJobSeeker>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-jobs-seekers', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/pencari-kerja/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
