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

  return { admissionPublic: data?.data ?? [], meta: data?.meta, loading }
}
export const useGetAdmissionInformationPublicDetail = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    data: AdmissionINformationPublic
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['admission-information-public-detail', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { admissionPublic: data?.data ?? undefined, loading }
}
export const useGetAdmissionInformationPublicLog = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{
    data: AdmissionLog
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['admission-information-public-log', id],
    queryFn: () => AxiosClient.get(`/unit-ppid/permohonan-riwayat/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { admissionPublicLog: data?.data, loading }
}
