import type { Meta } from '@/components/common/table/TablePagination'
import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios'
import type { ServiceAccreditation } from '../model'

interface Props {
  isGetAll?: boolean
}
const useGetServiceAccreditation = (props: Props) => {
  const { isGetAll = false } = props

  const [searchParams] = useSearchParams()
  const page = isGetAll ? '0' : searchParams.get('page') || '1'
  const limit = isGetAll ? '0' : searchParams.get('limit') || '1000'
  const search = searchParams.get('search') || ''
  const id_satuan_organisasi_akreditas = searchParams.get('id_satuan_organisasi_akreditas') || ''

  const ParamsSearch = new URLSearchParams({ page, limit, search, id_satuan_organisasi_akreditas })

  const { data, isLoading, isFetching } = useQuery<{
    data: ServiceAccreditation[]
    meta: Meta
  }>({
    refetchOnWindowFocus: false,
    queryKey: ['service-accreditation', ParamsSearch.toString()],
    queryFn: () => AxiosClient.get(`/lembaga/akreditas?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    accreditation: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export default useGetServiceAccreditation
