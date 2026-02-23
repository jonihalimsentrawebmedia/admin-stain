import { useEffect, useState } from 'react'
import type { AdmissionINformationPublic, AdmissionLog } from '../model'
import { useQuery } from '@tanstack/react-query'
import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import AxiosClient from '@/provider/axios'
interface Props {
  isGetAll?: boolean
}
export const useGetAdmissionInformationPublic = (props: Props) => {
  const { isGetAll = false } = props
  const [admissionPublic, setAdmissionPublic] = useState<AdmissionINformationPublic[]>([])

  const [meta, setMeta] = useState<Meta>()

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '10'
  const search = searchParams.get('search') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<{
    data: AdmissionINformationPublic[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['admission-information-public', ParamsSearch.toString()],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAdmissionPublic(data.data ?? [])
      setMeta(data.meta)
    }
  }, [data])

  return { admissionPublic, meta, loading }
}
export const useGetAdmissionInformationPublicDetail = (id: string) => {
  const [admissionPublic, setAdmissionPublic] = useState<AdmissionINformationPublic>()

  const { data, isLoading, isFetching } = useQuery<{
    data: AdmissionINformationPublic
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['admission-information-public-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAdmissionPublic(data.data ?? [])
    }
  }, [data])

  return { admissionPublic, loading }
}
export const useGetAdmissionInformationPublicLog = (id: string) => {
  const [admissionPublicLog, setAdmissionPublicLog] = useState<AdmissionLog>()

  const { data, isLoading, isFetching } = useQuery<{
    data: AdmissionLog
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['admission-information-public-log', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan-riwayat/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (data) {
      setAdmissionPublicLog(data.data ?? [])
    }
  }, [data])

  return { admissionPublicLog, loading }
}
