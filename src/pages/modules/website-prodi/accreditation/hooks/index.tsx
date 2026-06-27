import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { AcreditationList } from '@/pages/modules/website-utama/acreditation/model'

interface IAccreditationResponse {
  data: AcreditationList[]
  meta: Meta
}

interface IAccreditationLogItem {
  id: string
  [key: string]: unknown
}

export const UseGetAccreditationProdi = () => {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '10'
  const search = searchParams.get('search') ?? ''

  const ParamsSearch = new URLSearchParams({ page, limit, search })

  const { data, isLoading, isFetching } = useQuery<IAccreditationResponse>({
    queryKey: ['accreditation-prodi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/akreditas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { accreditation: data?.data ?? [], loading, meta: data?.meta }
}

export const UseGetAccreditationProdiById = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<AcreditationList>({
    queryKey: ['accreditation-prodi-detail', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/akreditas/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { accreditation: data, loading }
}

export const UseGetAccreditationProdiLog = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<{ data: IAccreditationLogItem[]; meta: Meta }>({
    queryKey: ['accreditation-prodi-log', id],
    refetchOnWindowFocus: false,
    queryFn: () => AxiosClient.get(`/prodi/akreditas-log/${id}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return { accreditationLog: data?.data ?? [], loading, meta: data?.meta }
}
