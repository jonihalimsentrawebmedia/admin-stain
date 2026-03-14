import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IJobSeekerRegistered } from '../data/types'

export type Status = 'PENDING' | 'REVISI' | 'DITOLAK' | 'DISETUJUI'

interface Props extends BasicProps {
  status: Status
}

export const UseGetVerificationJobSeeker = (props?: Props) => {
  const { status, page, limit, search } = props ?? {}

  const [verification, setVerification] = useState<IJobSeekerRegistered[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')
  if (status) ParamsSearch.append('status_pendaftaran', status)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['verification-job-seeker', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/verifikasi-pencari-kerja?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setVerification(data?.data)
      setMeta(data?.meta)
    }
  }, [data])

  return { loading, meta, verification }
}

export const UseGetDetailVerificationJobSeeker = (id: string) => {
  const [detail, setDetail] = useState<IJobSeekerRegistered>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-verification-job-seeker', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/verifikasi-pencari-kerja/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
