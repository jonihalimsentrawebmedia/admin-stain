import { useEffect, useState } from 'react'
import type { Meta } from '@/components/common/table/TablePagination.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IPartnershipRegistered } from '@/pages/modules/pusat-karir/management-user/user-verification/partnership/data/types.tsx'

export type Status = 'PENDING' | 'REVISI' | 'DITOLAK' | 'DISETUJUI'

interface Props extends BasicProps {
  status: Status
}

export const UseGetVerificationPartnership = (props?: Props) => {
  const { status, page, limit, search } = props ?? {}

  const [verification, setVerification] = useState<IPartnershipRegistered[]>([])
  const [meta, setMeta] = useState<Meta>()

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page ?? '0')
  if (limit) ParamsSearch.append('limit', limit ?? '10')
  if (search) ParamsSearch.append('search', search ?? '')
  if (status) ParamsSearch.append('status_pendaftaran', status)

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['verification-partnership', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/verifikasi-mitra-kerja?${ParamsSearch}`).then(
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

export const UseGetDetailVerificationPartnership = (id: string) => {
  const [detail, setDetail] = useState<IPartnershipRegistered>()

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['detail-verification-partnership', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/pusat-karir/verifikasi-mitra-kerja/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setDetail(data)
    }
  }, [data])

  return { detail, loading }
}
