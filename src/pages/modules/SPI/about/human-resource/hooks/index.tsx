import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { IGroupChief } from '../data/types.ts'
import type { BasicProps, IApiResponse } from '@/utils/globalType.ts'

export const UseGetChiefOfficerGroup = (props?: BasicProps) => {
  const { search, page, limit } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (search) ParamsSearch.append('search', search ?? '')
  if (page) ParamsSearch.append('page', page ?? '1')
  if (limit) ParamsSearch.append('limit', limit ?? '10')

  const { data, isLoading, isFetching } = useQuery<IApiResponse<IGroupChief[]>>({
    queryKey: ['sdm-spi', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/spi/kelompok-pimpinan?${ParamsSearch}`).then((res) => res.data),
  })

  const chiefOfficer: IGroupChief[] = data?.data ?? []
  const meta: Meta | undefined = data?.meta
  const loading = isLoading || isFetching

  return { loading, meta, chiefOfficer }
}

export const UseGetChiefOfficerDetail = (id: string) => {
  const { data: detail, isLoading, isFetching } = useQuery<IGroupChief>({
    queryKey: ['detail-sdm-spi', id],
    refetchOnWindowFocus: false,
    enabled: !!id,
    queryFn: () => AxiosClient.get(`/spi/kelompok-pimpinan/${id}`).then((res) => res.data.data),
  })

  const loading = isLoading || isFetching

  return { detail, loading }
}
