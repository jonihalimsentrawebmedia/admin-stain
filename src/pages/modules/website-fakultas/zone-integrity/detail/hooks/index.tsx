import type { Meta } from '@/components/common/table/TablePagination.tsx'
import { useQuery } from '@tanstack/react-query'
import AxiosClient from '@/provider/axios.tsx'
import type { BasicProps } from '@/utils/globalType.ts'
import type { ISbuZoneIntegrity } from '@/pages/modules/website-fakultas/zone-integrity/detail/data/types.ts'

interface props extends BasicProps {
  id: string
}

export const UseGetSubZoneIntegrity = (props?: props) => {
  const { page, limit, search, id } = props ?? {}

  const ParamsSearch = new URLSearchParams()
  if (page) ParamsSearch.append('page', page.toString())
  if (limit) ParamsSearch.append('limit', limit.toString())
  if (search) ParamsSearch.append('search', search)
  if (id) ParamsSearch.append('id-kategori', id)

  const { data, isLoading, isFetching } = useQuery<{
    data: ISbuZoneIntegrity[]
    meta: Meta
  }>({
    queryKey: ['zone-integrity', ParamsSearch.toString()],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/zona-integritas-sub-kategori?${ParamsSearch}`).then(
        (res) => res.data
      ),
  })

  const loading = isLoading || isFetching

  return {
    subZoneIntegrity: data?.data ?? [],
    loading,
    meta: data?.meta,
  }
}

export const UseGetDetailSubZoneIntegrity = (id: string) => {
  const { data, isLoading, isFetching } = useQuery<ISbuZoneIntegrity>({
    queryKey: ['detail-zone-integrity', id],
    refetchOnWindowFocus: false,
    queryFn: () =>
      AxiosClient.get(`/fakultas/zona-integritas-sub-kategori/${id}`).then((res) => res.data?.data),
  })

  const loading = isLoading || isFetching

  return { detail: data, loading }
}
