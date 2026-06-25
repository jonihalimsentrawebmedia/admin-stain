import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { IZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/data/types.ts'

export const UseGetZoneIntegrity = (props?: BasicProps) => {
  const { page, limit, search } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page.toString())
  if (limit) ParamsSearch.append('limit', limit.toString())
  if (search) ParamsSearch.append('search', search)

  const { data, isLoading, isFetching } = useQuery<{
    data: IZoneIntegrity[]
    meta: Meta
  }>({
    queryKey: ['zone-integrity', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/zona-integritas-kategori?${ParamsSearch}`).then((res) => res.data),
  })

  const loading = isLoading || isFetching

  return {
    zoneIntegrity: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export const UseGetDetailZoneIntegrity = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<IZoneIntegrity>({
    queryKey: ['detail-zone-integrity', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/zona-integritas-kategori/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
